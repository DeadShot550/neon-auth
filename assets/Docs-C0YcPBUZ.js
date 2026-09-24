import{j as e,L as h,d as b}from"./index-1EgGcOm-.js";import{a as i,n as v,d as w,a5 as u,V as f,L as C,U as j,K as N,B as A,D as k,f as y,Q as S,e as I,a6 as D,_ as E}from"./vendor-icons-nj5F7-Aq.js";import{e as T,r as _}from"./vendor-firebase-BvAUXHnQ.js";import{W as P}from"./WebThreads-DZUt9Ato.js";import{B as L}from"./BrandMark-uc_8msfg.js";import"./vendor-3d-canvas-Cp2KLNWz.js";const l=typeof window<"u"?window.location.origin:"https://croxyauth.pages.dev",m=[{id:"quickstart",name:"Quick Start",icon:e.jsx(u,{size:16}),badge:"Start Here"},{id:"sdks",name:"Client SDKs",icon:e.jsx(f,{size:16}),badge:"C#, C++, Python"},{id:"auth",name:"Authentication API",icon:e.jsx(C,{size:16})},{id:"users",name:"User Management",icon:e.jsx(j,{size:16})},{id:"licenses",name:"License Management",icon:e.jsx(N,{size:16})},{id:"apps",name:"App Management",icon:e.jsx(A,{size:16})},{id:"vars",name:"Remote Variables",icon:e.jsx(k,{size:16})}],R=[{category:"auth",title:"Login",method:"POST",path:"/login",desc:"Authenticate a user into your application. Handles version checks, HWID locking, bans, and expiry automatically.",beginner:"This is the main authentication call. Invoke it when your desktop/game client signs in a user.",params:[{name:"username",type:"string",required:!0,desc:"The user's username",example:'"john_doe"'},{name:"password",type:"string",required:!0,desc:"The user's password",example:'"MyPass123"'},{name:"secret",type:"string",required:!0,desc:"Your Neon app secret key (from Dashboard)",example:'"neon-abc123..."'},{name:"appName",type:"string",required:!0,desc:"The name of your application",example:'"MyApp"'},{name:"appVersion",type:"string",required:!0,desc:"Your current app version",example:'"1.0.0"'},{name:"hwid",type:"string",required:!1,desc:"Hardware ID to lock user to a single machine",example:'"NEON-HWID-..."'}],example:`fetch('${l}/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    password: 'MyPass123',
    secret: 'neon-abc123',
    appName: 'MyApp',
    appVersion: '1.0.0',
    hwid: 'NEON-HWID-XYZ'
  })
})`,responses:[{code:"LOGIN_SUCCESS",desc:"User authenticated. Returns subscription plan and expiry date.",success:!0},{code:"INVALID_CREDENTIALS",desc:"Wrong username or password.",success:!1},{code:"USER_BANNED",desc:"This user has been banned from your application.",success:!1},{code:"HWID_MISMATCH",desc:"User is logging in from an unauthorized device.",success:!1},{code:"LICENSE_EXPIRED",desc:"The user's subscription has expired.",success:!1},{code:"APPLICATION_PAUSED",desc:"Your application is temporarily paused by admin.",success:!1}]},{category:"auth",title:"Register",method:"POST",path:"/register",desc:"Create a new user account using a license key. The license key is consumed on success.",beginner:"Call this when a new customer registers. They require a valid license key generated from your Neon Dashboard.",params:[{name:"username",type:"string",required:!0,desc:"Desired username",example:'"new_user"'},{name:"password",type:"string",required:!0,desc:"Desired password",example:'"SecurePass"'},{name:"licenseKey",type:"string",required:!0,desc:"A valid unused license key",example:'"NEON-ABCD-EFGH"'},{name:"secret",type:"string",required:!0,desc:"Your Neon app secret key",example:'"neon-abc123..."'},{name:"appName",type:"string",required:!0,desc:"Application name",example:'"MyApp"'},{name:"appVersion",type:"string",required:!0,desc:"App version",example:'"1.0.0"'},{name:"hwid",type:"string",required:!1,desc:"Hardware ID to bind during registration",example:'"NEON-HWID-XYZ"'}],example:`fetch('${l}/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'new_user',
    password: 'SecurePass',
    licenseKey: 'NEON-ABCD-EFGH',
    secret: 'neon-abc123',
    appName: 'MyApp',
    appVersion: '1.0.0',
    hwid: 'NEON-HWID-XYZ'
  })
})`,responses:[{code:"REGISTER_SUCCESS",desc:"Account created and license key consumed.",success:!0},{code:"USERNAME_TAKEN",desc:"Username already registered.",success:!1},{code:"INVALID_LICENSE",desc:"License key is invalid or already consumed.",success:!1},{code:"VERSION_MISMATCH",desc:"Client version does not match active version.",success:!1}]},{category:"auth",title:"Check App Version",method:"POST",path:"/versioncheck",desc:"Check if the running client binary is up to date. Returns 409 Conflict if outdated.",beginner:"Place this at the very top of your program before loading user interfaces.",params:[{name:"secret",type:"string",required:!0,desc:"Your Neon app secret key",example:'"neon-abc123..."'},{name:"appName",type:"string",required:!0,desc:"Application name",example:'"MyApp"'},{name:"appVersion",type:"string",required:!0,desc:"The version of this running binary",example:'"1.0.0"'}],example:`fetch('${l}/versioncheck', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: 'neon-abc123',
    appName: 'MyApp',
    appVersion: '1.0.0'
  })
})`,responses:[{code:"VERSION_OK",desc:"Client is running the active version.",success:!0},{code:"VERSION_MISMATCH",desc:"Client is outdated. Direct users to download update.",success:!1},{code:"APPLICATION_PAUSED",desc:"Developer has temporarily locked this application.",success:!1}]},{category:"vars",title:"Get Cloud Variable",method:"POST",path:"/get_variable",desc:"Fetch an encrypted remote string stored in your Neon application.",beginner:"Store sensitive server URLs, cheat offsets, or dynamic API keys securely in the cloud.",params:[{name:"secret",type:"string",required:!0,desc:"App secret key",example:'"neon-abc123..."'},{name:"appName",type:"string",required:!0,desc:"Application name",example:'"MyApp"'},{name:"variableName",type:"string",required:!0,desc:"Name of the variable defined in Dashboard",example:'"server_ip"'}],example:`fetch('${l}/get_variable', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: 'neon-abc123',
    appName: 'MyApp',
    variableName: 'server_ip'
  })
})`,responses:[{code:"FETCH_SUCCESS",desc:"Variable returned successfully in response payload.",success:!0},{code:"VARIABLE_NOT_FOUND",desc:"No variable exists with that name.",success:!1}]}],x=[{id:"csharp-neonauth",name:"C# (NeonAuth.cs Drop-In)",filename:"NeonAuth.cs",downloadUrl:"/sdks/NeonAuth.cs",icon:"🛡️",description:"100% drop-in C# NeonAuth modern client library with HMAC-SHA256 signature verification, HWID hashing, and synchronous/async execution.",code:`using System;
using System.Windows.Forms;
using NeonAuth;

namespace YourApplication
{
    static class Program
    {
        // 1. Initialize with your Dashboard credentials
        public static api NeonAuthApp = new api(
            name: "FREE",                                                          // Application Name
            ownerid: "6c3f578512",                                                 // 10-Character Owner ID
            secret: "6c3f578512d8266e26da2876b4e6b2c02f54b257bffcd8908f25d1795d9addfd", // 64-Character Secret Key
            version: "1.0"                                                         // Application Version
        );

        [STAThread]
        static void Main()
        {
            // 2. Perform Handshake & Signature Validation
            NeonAuthApp.init();

            // 3. Authenticate User (or use NeonAuthApp.license("KEY-HERE"))
            NeonAuthApp.login("john_doe", "password123");

            if (NeonAuthApp.response.success)
            {
                MessageBox.Show("Welcome " + NeonAuthApp.user_data.username + "!");
                Application.Run(new MainForm());
            }
            else
            {
                MessageBox.Show("Authentication Failed: " + NeonAuthApp.response.message);
            }
        }
    }
}`},{id:"csharp",name:"C# (.NET Modern Async)",filename:"NeonAuth.cs",downloadUrl:"/sdks/NeonAuth.cs",icon:"🔷",description:"Modern asynchronous C# SDK with HttpClient connection pooling, WMI motherboard/CPU HWID hashing, and strong typing.",code:`using System;
using System.Threading.Tasks;
using NeonAuthentication;

class Program
{
    static async Task Main()
    {
        // 1. Initialize Neon Auth SDK with credentials from Dashboard
        var auth = new NeonAuth(
            appName: "INTERNAL",
            appVersion: "1.0",
            appSecret: "6c3f578512d8266e26da2876b4e6b2c02f54b257bffcd8908f25d1795d9addfd",
            baseUrl: "https://croxyauth.pages.dev"
        );

        // 2. Perform Version Check on Startup
        var verCheck = await auth.CheckVersionAsync();
        if (!verCheck.Success)
        {
            Console.WriteLine("[!] Update required: " + verCheck.Message);
            return;
        }

        // 3. User Login with HWID Binding
        var login = await auth.LoginAsync("john_doe", "secret123");
        if (login.Success)
        {
            Console.WriteLine("[✓] Welcome, " + login.Username + "!");
            Console.WriteLine("    Subscription: " + login.Subscription);
            Console.WriteLine("    Expires: " + login.Expiry);
        }
    }
}`},{id:"cpp",name:"C++ (WinINet / Native)",filename:"NeonAuth.hpp",downloadUrl:"/sdks/NeonAuth.hpp",icon:"⚡",description:"Single-header native C++ library with WinINet HTTP engine, zero external DLL requirements, and registry hardware fingerprinting.",code:`#include <iostream>
#include "NeonAuth.hpp"

int main()
{
    // 1. Initialize the Neon Client
    NeonAuth::Client auth(
        "MyCheatEngine",          // Application Name
        "1.0",                    // App Version
        "6c3f578512d8266e26da2876b4e6b2c02f54b257bffcd8908f25d1795d9addfd", // App Secret
        "https://croxyauth.pages.dev" // API Base URL
    );

    std::cout << "[+] Device HWID: " << NeonAuth::Client::GetHWID() << std::endl;

    // 2. Version Check
    auto ver = auth.CheckVersion();
    if (!ver.success) {
        std::cout << "[!] Please update your client: " << ver.message << std::endl;
        return 1;
    }

    // 3. Authenticate User
    auto res = auth.Login("john_doe", "myPass123");
    if (res.success) {
        std::cout << "[✓] Access Granted! Plan: " << res.subscription << std::endl;
    } else {
        std::cout << "[✗] Failed: " << res.message << std::endl;
    }

    return 0;
}`},{id:"python",name:"Python",filename:"neon_auth.py",downloadUrl:"/sdks/neon_auth.py",icon:"🐍",description:"Clean Python client SDK supporting multi-platform machine-id & WMI HWID hashing, session pooling, and remote variables.",code:`from neon_auth import NeonAuth

# 1. Initialize Neon Client
auth = NeonAuth(
    app_name="MyPythonApp",
    app_version="1.0",
    app_secret="6c3f578512d8266e26da2876b4e6b2c02f54b257bffcd8908f25d1795d9addfd",
    base_url="https://croxyauth.pages.dev"
)

# 2. Check Version
ver = auth.check_version()
if not ver.success:
    print(f"[!] Outdated version: {ver.message}")
    exit(1)

# 3. User Login
res = auth.login("developer", "password123")
if res.success:
    print(f"[✓] Logged in as {res.username} ({res.subscription})")
    print(f"    Expiry: {res.expiry}")
else:
    print(f"[✗] Login Error: {res.message}")`},{id:"rust",name:"Rust",filename:"neon_auth.rs",downloadUrl:"/sdks/neon_auth.rs",icon:"🦀",description:"High-performance async Rust client with serde_json and reqwest integration.",code:`use neon_auth::NeonAuth;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 1. Initialize Client
    let auth = NeonAuth::new("RustApp", "1.0", "6c3f578512d8266e26da2876b4e6b2c02f54b257bffcd8908f25d1795d9addfd", None);

    // 2. Check Version
    let ver = auth.check_version().await?;
    println!("Version status: {}", ver.message);

    // 3. Login
    let login = auth.login("john_doe", "superSecret123", None).await?;
    if login.success {
        println!("[✓] Logged in! User: {:?}", login.username);
        println!("    Plan: {:?}", login.subscription);
    } else {
        println!("[✗] Failed: {}", login.message);
    }

    Ok(())
}`},{id:"go",name:"Go",filename:"neon_auth.go",downloadUrl:"/sdks/neon_auth.go",icon:"🩵",description:"Standard Go package with context-based HTTP requests and JSON payload serialization.",code:`package main

import (
    "fmt"
    "neonauth"
)

func main() {
    client := neonauth.NewClient("GoCliTool", "1.0", "6c3f578512d8266e26da2876b4e6b2c02f54b257bffcd8908f25d1795d9addfd", "")

    // Check version
    ver, _ := client.CheckVersion()
    fmt.Printf("Version check: %s\\n", ver.Message)

    // Login
    res, err := client.Login("developer", "secretPass", "")
    if err == nil && res.Success {
        fmt.Printf("[✓] Authenticated: %s (%s)\\n", res.Username, res.Subscription)
    } else {
        fmt.Printf("[✗] Auth Error: %s\\n", res.Message)
    }
}`}],M=()=>e.jsxs("div",{className:"space-y-8 animate-fade-in",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("span",{className:"text-cyan-400",children:e.jsx(u,{size:18})}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-cyan-300 font-mono",children:"Getting Started"})]}),e.jsx("h1",{className:"text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3",children:"NX Auth Quickstart Guide"}),e.jsx("p",{className:"text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal",children:"Integrate cryptographic license management, hardware ID device binding, and HMAC signature verification into any application in less than 5 minutes."})]}),e.jsxs("div",{className:"crx-crystal-card p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-purple-950/20 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-4",children:[e.jsxs("div",{className:"space-y-1.5",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-400 animate-ping"}),e.jsx("span",{className:"text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono",children:"Live API Base URL (NeonAuth 1.3 / Global Edge)"})]}),e.jsx("div",{className:"text-sm font-mono text-white font-bold select-all bg-black/60 px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-3",children:e.jsx("code",{children:"https://croxyauth.pages.dev/api/1.3/"})}),e.jsx("p",{className:"text-slate-400 text-xs leading-relaxed",children:"Compatible with custom domains! Works directly with NeonAuth.cs, neonauth.py, C++, and custom clients."})]}),e.jsxs("button",{onClick:()=>{navigator.clipboard.writeText("https://croxyauth.pages.dev/api/1.3/"),alert("Copied API Endpoint: https://croxyauth.pages.dev/api/1.3/")},className:"px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer",children:[e.jsx(y,{size:14})," Copy API URL"]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:[e.jsxs("div",{className:"crx-crystal-card p-6 rounded-2xl space-y-2.5",children:[e.jsx("div",{className:"w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold font-mono text-sm",children:"01"}),e.jsx("h3",{className:"font-bold text-white text-sm",children:"Get App Secret"}),e.jsxs("p",{className:"text-slate-400 text-xs leading-relaxed",children:["Create your application in the NX Dashboard to receive your 64-character ",e.jsx("code",{className:"bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-mono",children:"App Secret"})," and 10-char ",e.jsx("code",{className:"bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-mono",children:"Owner ID"}),"."]})]}),e.jsxs("div",{className:"crx-crystal-card p-6 rounded-2xl space-y-2.5",children:[e.jsx("div",{className:"w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center font-bold font-mono text-sm",children:"02"}),e.jsx("h3",{className:"font-bold text-white text-sm",children:"Include SDK File"}),e.jsx("p",{className:"text-slate-400 text-xs leading-relaxed",children:"Download our drop-in C# NeonAuth, C++, Python, Rust, or Go SDK and drop it right into your project source."})]}),e.jsxs("div",{className:"crx-crystal-card p-6 rounded-2xl space-y-2.5",children:[e.jsx("div",{className:"w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold font-mono text-sm",children:"03"}),e.jsx("h3",{className:"font-bold text-white text-sm",children:"Call Login & Protect"}),e.jsxs("p",{className:"text-slate-400 text-xs leading-relaxed",children:["Invoke ",e.jsx("code",{className:"bg-white/10 px-1.5 py-0.5 rounded text-emerald-300 font-mono",children:"NeonAuthApp.init()"})," and login on startup to lock software execution to valid licenses."]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-xl font-bold text-white tracking-tight",children:"Three-Step Implementation"}),[{step:"01",title:"Initialize SDK Instance",desc:"Define your application name, version, and secret credentials from the NX Dashboard.",code:`public static api NeonAuthApp = new api(
    name: "FREE",
    ownerid: "6c3f578512",
    secret: "6c3f578512d8266e26da2876b4e6b2c02f54b257bffcd8908f25d1795d9addfd",
    version: "1.0"
);`},{step:"02",title:"Perform Edge Handshake",desc:"Connect to Anycast edge nodes to verify application state, version synchronization, and HMAC signature assertion.",code:`NeonAuthApp.init();
if (!NeonAuthApp.response.success) {
    MessageBox.Show(NeonAuthApp.response.message);
    Environment.Exit(0);
}`},{step:"03",title:"Authenticate User & Check HWID",desc:"Validate user credentials or license keys against the encrypted real-time cloud database.",code:`NeonAuthApp.login(username, password);
// Or login with key: NeonAuthApp.license(licenseKey);

if (NeonAuthApp.response.success) {
    Console.WriteLine("Logged in! User: " + NeonAuthApp.user_data.username);
    Console.WriteLine("Subscription: " + NeonAuthApp.user_data.subscriptions[0].subscription);
}`}].map((s,n)=>e.jsxs("div",{className:"flex gap-5 p-6 crx-frosted-crystal rounded-2xl transition-all",children:[e.jsx("div",{className:"text-3xl font-extrabold text-white/20 font-mono shrink-0 select-none",children:s.step}),e.jsxs("div",{className:"flex-1 min-w-0 space-y-3",children:[e.jsx("h3",{className:"font-bold text-white text-base",children:s.title}),e.jsx("p",{className:"text-slate-300 text-xs sm:text-sm leading-relaxed",children:s.desc}),e.jsx("pre",{className:"bg-[#050811]/90 border border-white/10 rounded-xl p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed",children:e.jsx("code",{children:s.code})})]})]},n))]})]}),U=()=>{const[s,n]=i.useState(x[0].id),[o,c]=i.useState(!1),r=x.find(a=>a.id===s)||x[0],d=a=>{navigator.clipboard.writeText(a),c(!0),setTimeout(()=>c(!1),2e3)};return e.jsxs("div",{className:"space-y-8 animate-fade-in",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("span",{className:"text-cyan-400",children:e.jsx(f,{size:18})}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-cyan-300 font-mono",children:"Client Libraries"})]}),e.jsx("h1",{className:"text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3",children:"Official Client SDKs & Libraries"}),e.jsx("p",{className:"text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal",children:"Download complete, production-grade SDK files for C# NeonAuth, C++, Python, JavaScript, Rust, and Go. All files include built-in cryptographic hardware locking, version verification, and remote variable resolution."})]}),e.jsx("div",{className:"flex flex-wrap gap-2.5 pb-2 border-b border-white/10",children:x.map(a=>e.jsxs("button",{onClick:()=>n(a.id),className:`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer
                            ${s===a.id?"bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 crx-frosted-crystal-pill":"bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08]"}`,children:[e.jsx("span",{children:a.icon}),e.jsx("span",{children:a.name})]},a.id))}),e.jsxs("div",{className:"crx-frosted-crystal rounded-3xl overflow-hidden border border-white/15 shadow-2xl",children:[e.jsxs("div",{className:"p-4 sm:p-5 bg-white/[0.03] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono text-sm",children:e.jsx(S,{size:18})}),e.jsxs("div",{children:[e.jsxs("h3",{className:"text-sm font-bold text-white flex items-center gap-2",children:[r.name,e.jsx("span",{className:"text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20",children:r.filename})]}),e.jsx("p",{className:"text-[11px] text-slate-400 mt-0.5",children:r.description})]})]}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{onClick:()=>d(r.code),className:"px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer",children:[o?e.jsx(I,{size:14,className:"text-emerald-400"}):e.jsx(y,{size:14}),o?"Copied":"Copy Code"]})})]}),e.jsx("div",{className:"p-6 bg-[#04060d]/90 overflow-x-auto",children:e.jsx("pre",{className:"text-xs font-mono text-cyan-200/90 leading-relaxed",children:e.jsx("code",{children:r.code})})})]})]})},O=({ep:s,baseUrl:n})=>{const[o,c]=i.useState(!1),[r,d]=i.useState(!0);return e.jsxs("div",{className:"crx-crystal-card rounded-2xl overflow-hidden border border-white/10 mb-4 transition-all",children:[e.jsxs("div",{onClick:()=>d(!r),className:"p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs",children:s.method}),e.jsx("span",{className:"text-sm font-bold text-white font-mono",children:s.path}),e.jsxs("span",{className:"text-xs text-slate-400 hidden sm:inline",children:["• ",s.title]})]}),e.jsx("div",{className:"flex items-center gap-2 text-slate-400",children:r?e.jsx(D,{size:16}):e.jsx(E,{size:16})})]}),r&&e.jsxs("div",{className:"p-5 pt-0 border-t border-white/5 space-y-4",children:[e.jsx("p",{className:"text-xs text-slate-300 leading-relaxed mt-4 font-normal",children:s.desc}),s.example&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("span",{className:"text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold",children:"Request Example"}),e.jsx("pre",{className:"p-4 rounded-xl bg-[#04060d]/90 border border-white/10 text-xs font-mono text-cyan-300 overflow-x-auto",children:e.jsx("code",{children:s.example})})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("span",{className:"text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold",children:"Response Codes"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:s.responses.map((a,p)=>e.jsxs("div",{className:"p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono",children:[e.jsx("span",{className:a.success?"text-emerald-400 font-bold":"text-slate-300",children:a.code}),e.jsx("span",{className:"text-[10px] text-slate-400",children:a.desc})]},p))})]})]})]})},G=()=>{const[s,n]=i.useState("quickstart"),[o,c]=i.useState(!1),[r,d]=i.useState([]);i.useEffect(()=>T(_(b,"system/config/sdks"),t=>{d(Object.values(t.val()||{}))}),[]);const a=R.filter(t=>t.category===s),p=m.find(t=>t.id===s);return e.jsxs("div",{className:"min-h-screen bg-[#04060d] text-slate-100 flex flex-col selection:bg-cyan-900/40 selection:text-cyan-200 overflow-x-hidden relative",children:[e.jsx("div",{className:"fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-75",children:e.jsx(P,{color1:"#38bdf8",color2:"#c084fc",color3:"#ffffff",speed:.25,threadCount:7,frequency:4.5,spread:.24,taper:1,position:.5,fanMode:"center",glow:.035,falloff:.55,thickness:1.25,brightness:.75,opacity:.9,mirror:!0,shimmer:!0,grain:!1,grainIntensity:.02,mouseInteraction:!0,mouseStrength:.35})}),e.jsx("div",{className:"fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-[120px] pointer-events-none -z-10"}),e.jsx("header",{className:"fixed top-5 left-0 right-0 z-50 flex justify-center px-4",children:e.jsxs("nav",{className:"w-full max-w-6xl rounded-2xl crx-frosted-crystal-pill px-5 py-2.5 flex items-center justify-between transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.7)]",children:[e.jsx(L,{mode:"compact",suffix:"Documentation",to:"https://croxyauth.pages.dev/"}),e.jsxs("div",{className:"hidden md:flex items-center gap-1",children:[e.jsx("button",{onClick:()=>n("quickstart"),className:`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${s==="quickstart"?"text-cyan-300 bg-white/[0.1]":"text-slate-300 hover:text-white hover:bg-white/[0.06]"}`,children:"Quick Start"}),e.jsx("button",{onClick:()=>n("sdks"),className:`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${s==="sdks"?"text-cyan-300 bg-white/[0.1]":"text-slate-300 hover:text-white hover:bg-white/[0.06]"}`,children:"Client SDKs"}),e.jsx("button",{onClick:()=>n("auth"),className:`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${s==="auth"?"text-cyan-300 bg-white/[0.1]":"text-slate-300 hover:text-white hover:bg-white/[0.06]"}`,children:"API Reference"})]}),e.jsx("div",{className:"flex items-center gap-3",children:e.jsxs(h,{to:"/dashboard",className:"text-xs font-bold text-slate-100 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer",children:[e.jsx(v,{size:13,className:"text-cyan-300"}),"Dashboard"]})})]})}),e.jsxs("div",{className:"flex-1 flex max-w-6xl mx-auto w-full pt-28 sm:pt-32 pb-16 px-4 relative z-10 gap-8",children:[e.jsxs("aside",{className:`
                    ${o?"flex":"hidden"} lg:flex
                    fixed lg:sticky top-28 left-4 right-4 lg:left-auto lg:right-auto
                    z-40 lg:z-auto
                    w-full lg:w-64 h-auto lg:h-[calc(100vh-9rem)]
                    flex-col crx-frosted-crystal rounded-3xl
                    p-5 overflow-y-auto shrink-0
                `,children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-widest text-cyan-300 mb-3 px-1 font-mono",children:"Documentation"}),e.jsx("nav",{className:"space-y-1.5 flex-1",children:m.map(t=>e.jsxs("button",{onClick:()=>{n(t.id),c(!1)},className:`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-xs font-semibold text-left cursor-pointer
                                    ${s===t.id?"bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-200 border border-white/20 font-bold shadow-lg shadow-cyan-500/10":"text-slate-400 hover:text-white hover:bg-white/[0.04]"}`,children:[e.jsx("span",{className:s===t.id?"text-cyan-300":"text-slate-500",children:t.icon}),e.jsx("span",{className:"flex-1",children:t.name}),t.badge&&e.jsx("span",{className:"text-[9px] font-bold bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider",children:t.badge})]},t.id))})]}),e.jsx("main",{className:"flex-1 min-w-0",children:s==="quickstart"?e.jsx(M,{}):s==="sdks"?e.jsx(U,{}):e.jsxs("div",{className:"space-y-6 animate-fade-in",children:[e.jsxs("div",{className:"mb-8",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx("span",{className:"text-cyan-400",children:p?.icon}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-cyan-300 font-mono",children:"REST API Reference"})]}),e.jsx("h1",{className:"text-3xl font-bold tracking-tight text-white mb-2",children:p?.name}),e.jsxs("p",{className:"text-slate-300 text-xs sm:text-sm",children:["All endpoints accept ",e.jsx("code",{className:"bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-mono",children:"Content-Type: application/json"})," and return cryptographic JSON envelopes."]})]}),e.jsx("div",{className:"space-y-3",children:a.map((t,g)=>e.jsx(O,{ep:t,baseUrl:l},g))})]})})]}),e.jsx("footer",{className:"border-t border-white/[0.08] bg-[#04060d]/90 py-8 px-4 sm:px-8 backdrop-blur-2xl relative z-10",children:e.jsxs("div",{className:"max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-mono",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(w,{size:14,className:"text-cyan-400"}),e.jsx("span",{className:"text-white font-bold",children:"NX AUTHENTICATION PLATFORM"}),e.jsx("span",{children:"• Sub-25ms Global Edge Cryptography"})]}),e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(h,{to:"/",className:"hover:text-white transition-colors",children:"Home"}),e.jsx(h,{to:"/login",className:"hover:text-white transition-colors",children:"Dashboard"})]})]})})]})};export{G as Docs,G as default};
