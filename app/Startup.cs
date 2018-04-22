using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using MidnightLizard.Web.Portal.Infrastructure;

namespace MidnightLizard.Web.Portal
{
    public class Startup
    {
        public static IHostingEnvironment _env;

        public Startup(IHostingEnvironment env)
        {
            _env = env;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowAllHeaders",
            //          builder =>
            //          {
            //              builder.AllowAnyOrigin()
            //                     .AllowAnyHeader()
            //                     .AllowAnyMethod()
            //                     .AllowCredentials();
            //          });
            //});

            // Authentication
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                    //options.DefaultSignOutScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                })
                .AddCookie(
                //options =>
                //{
                //    options.SlidingExpiration = true;
                //    options.AccessDeniedPath = "/AccessDenied";
                //    options.ExpireTimeSpan = new TimeSpan(2, 0, 0);
                //}
                )
                .AddOpenIdConnect(options =>
                {
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.SignOutScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    //options.ClientSecret = "secret";

                    options.Authority = Configuration.GetValue<string>(nameof(Settings.IDENTITY_URL));
                    options.RequireHttpsMetadata = false;

                    options.ClientId = "portal-client";
                    options.ResponseType = "id_token token";
                    options.SaveTokens = true;
                });

            // Add framework services.
            services.AddMvc();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddNodeServices(options =>
            {
                if (_env.IsDevelopment())
                {
                    // chrome-devtools://
                    options.LaunchWithDebugging = true;
                    options.DebuggingPort = 9228;
                }
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseDeveloperExceptionPage();
                //app.UseExceptionHandler("/Home/Error");
            }

            //app.UseCors("AllowAllHeaders");

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
