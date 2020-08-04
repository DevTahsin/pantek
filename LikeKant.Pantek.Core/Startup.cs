using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LikeKant.Pantek.Core.Entities;
using LikeKant.Pantek.Core.Helpers;
using LikeKant.Pantek.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.ApplicationInsights.AspNetCore;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.OData.Edm;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using SixLabors.ImageSharp.Web.DependencyInjection;
using SixLabors.ImageSharp.Web.Commands;
using SixLabors.ImageSharp.Memory;
using SixLabors.ImageSharp.Web.Caching;
using SixLabors.ImageSharp.Web.Providers;
using SixLabors.ImageSharp.Web.Processors;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp.Web.Middleware;
using SixLabors.ImageSharp.Web;

namespace LikeKant.Pantek.Core
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
            options.UseNpgsql(Configuration.GetConnectionString("PantekPostgre")));
            //services.AddDbContext<DataContext>(x => x.UseInMemoryDatabase("TestDb"));
            services.AddCors();
            services.AddControllers(mvcOptions => { mvcOptions.EnableEndpointRouting = false; })
                .AddJsonOptions(x => x.JsonSerializerOptions.IgnoreNullValues = true);
            services.AddControllersWithViews(o =>
            {
                o.UseGeneralRoutePrefix("api");
            });
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddHttpContextAccessor();
            // configure DI for application services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ILogService, LogService>();
            services.AddScoped<ILanguageService, LanguageService>();
            services.AddApplicationInsightsTelemetry();
            services.AddOData();
            services.AddImageSharpCore()
        .SetRequestParser<QueryCollectionRequestParser>()
        .Configure<PhysicalFileSystemCacheOptions>(options =>
        {
            options.CacheFolder = "is-cache";
        })
        .SetCache(provider =>
        {
            return new PhysicalFileSystemCache(
                        provider.GetRequiredService<IOptions<PhysicalFileSystemCacheOptions>>(),
                        provider.GetRequiredService<IWebHostEnvironment>(),
                        provider.GetRequiredService<IOptions<ImageSharpMiddlewareOptions>>(),
                        provider.GetRequiredService<FormatUtilities>());
        })
        .SetCacheHash<CacheHash>()
        .AddProvider<PhysicalFileSystemProvider>()
        .AddProcessor<ResizeWebProcessor>()
        .AddProcessor<FormatWebProcessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "ClientApp";

            //    if (env.IsDevelopment())
            //    {
            //        spa.UseAngularCliServer(npmScript: "start");
            //    }
            //});

            app.UseImageSharp();
            app.UseStaticFiles();
            //app.UseHttpsRedirection();

            app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .SetIsOriginAllowed(origin => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMvc(routeBuilder =>
            {
                routeBuilder.EnableDependencyInjection();
                routeBuilder.Select().Expand().Count().Filter().OrderBy().MaxTop(100).SkipToken().Build();
                routeBuilder.MapODataServiceRoute("odata", "odata", GetEdmModel());
            });

            //app.UseEndpoints(x => x.MapControllers());
        }

        IEdmModel GetEdmModel()
        {
            var odataBuilder = new ODataConventionModelBuilder();
            odataBuilder.EntitySet<Log>("Logs");

            return odataBuilder.GetEdmModel();
        }
    }
}
