"use client"
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import BG from "./component/background/background";
import Navbar from "./component/navbar/navbar";
import { ChevronRight, Github, Zap, Shield, GitBranch, Server, Database, Globe, Users, Terminal, Rocket, Code, Lock, CheckCircle, ArrowRight, Play, FileText, Clock, Layers, Network, BarChart3, GitMerge } from "lucide-react";

export default function Hello() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Zap, title: "Build and Deploy", desc: "Deploy any combination of services, volumes, and databases from GitHub or Docker", replaces: "Heroku, Vercel, Netlify" },
    { icon: Network, title: "Network and Connect", desc: "Automated service discovery, blazing fast networking, and support for any protocol", replaces: "AWS Load Balancer, Nginx" },
    { icon: BarChart3, title: "Scale and Grow", desc: "Dynamically scales servers, storage, and networking to meet application demands", replaces: "AWS Auto Scaling, K8s HPA" },
    { icon: Terminal, title: "Monitor and Observe", desc: "Precise logging, metrics, alerting, profiles, traces without any code changes", replaces: "Datadog, New Relic" },
    { icon: GitMerge, title: "Evolve and Collaborate", desc: "Make changes in one environment and seamlessly re-apply them without breaking production", replaces: "Jenkins, GitLab CI" }
  ];

  const cliCommands = [
    "$ deployx init <github-url>",
    "$ deployx push",
    "$ deployx live ",
    "$ deployx deploy --env prod",
    "$ deployx logs --project api-server", 
    "$ deployx rollback --to v2.3.1"
  ];

  const testimonials = [
    {
      quote: "DeployX is where we host all of our backend services along with our databases. It's been an integral part of our infrastructure since the very beginning.",
      author: "Sarah Chen",
      role: "CTO at TechFlow"
    },
    {
      quote: "DeployX is a game changer for us. We're serving 50,000+ developers with a small team. Every minute spent on infrastructure is a minute we're not building features.",
      author: "Alex Rodriguez", 
      role: "Founder at DevTools Inc"
    },
    {
      quote: "Even though we have internal K8s, we chose DeployX so we weren't spending time writing YAML files when we could be working on the product.",
      author: "Maya Patel",
      role: "Engineering Lead at StartupXYZ"
    }
  ];

  const twitterTweets = [
    { user: "@dev_sarah", text: "Deployed my entire stack on @DeployX in 60 seconds. No more fighting with Docker configs! 🚀" },
    { user: "@fullstack_mike", text: "This week I swapped Heroku with @DeployX. No more annoying database updates. In love with the Docker support!" },
    { user: "@startup_founder", text: "There is an easier option. Deploying literally anything on @DeployX" },
    { user: "@indie_hacker", text: "DeployX is not exaggerating when they say 'seconds'. Bringing my SaaS online took minutes!" },
    { user: "@backend_dev", text: "Addicted to organizing my microservices in @DeployX. The dashboard is chef's kiss 👨‍🍳💋" },
    { user: "@freelance_dev", text: "The UX for deploying on @DeployX is probably the best I've ever used. MySQL setup was so easy and fast." }
  ];

  return (
    <>
      <Navbar/>
      <div className={styles.page}>
        <BG/>
        
        {/* Hero Section */}
        <div className={styles.main}>
          <h1>Zero-Config Infrastructure for Developers</h1>
          <p>Deploy full-stack apps in seconds with GitHub integration, dynamic subdomains, and zero-config reverse proxying.</p>
          <div className={styles.action}>
            <a href="/new">Start Deploying</a>
            <a href="/demo">Documentation</a>
          </div>
        </div>
      </div>

      {/* Features Section - Railway Style */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-500 ${
                activeFeature === index ? 'scale-105' : ''
              }`}
              
            >
              <div className={`p-6 rounded-2xl border transition-all duration-300 h-full ${
                activeFeature === index
                  ? 'bg-white text-gray-900 border-gray-300 shadow-2xl'
                  : 'bg-gray-900 border-gray-700 hover:border-gray-600'
              }`}>
                <feature.icon className={`w-12 h-12 mb-4 ${
                  activeFeature === index ? 'text-gray-900' : 'text-gray-300'
                }`} />
                <h3 className={`text-xl font-bold mb-3 ${
                  activeFeature === index ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${
                  activeFeature === index ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {feature.desc}
                </p>
                <div className={`text-xs font-mono ${
                  activeFeature === index ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  Replaces: {feature.replaces}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DevOps Suite Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-100" style={{fontFamily: 'var(--font-cubano, "Arial Black", sans-serif)', fontWeight: 400}}>
          Complete DevOps Suite
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Server, title: "Deploy Server", desc: "Deploy via Git, CLI, or API to VMs, Docker, or Kubernetes clusters" },
            { icon: Terminal, title: "CLI Tool", desc: "Lightweight CLI to init projects, push updates, rollback, monitor deployments" },
            { icon: Globe, title: "DNS Manager", desc: "Internal + API-based management for DNS records (Cloudflare, Route53)" },
            { icon: Database, title: "Dashboard", desc: "Next.js web UI for project overview, logs, team roles, and secrets management" },
            { icon: Shield, title: "Security First", desc: "JWT + OAuth2 Auth, TOTP 2FA, RBAC, encrypted secrets vault" },
            { icon: GitBranch, title: "CI/CD Native", desc: "GitHub, GitLab, Bitbucket support with YAML pipelines and container registry" }
          ].map((component, index) => (
            <div key={index} className="group p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
              <component.icon className="w-12 h-12 text-gray-300 mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white">{component.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors" style={{fontFamily: 'var(--font-montserrat, "Helvetica", sans-serif)'}}>{component.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLI Demo */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center mb-6">
            <Terminal className="w-6 h-6 mr-3 text-green-400" />
            <h3 className="text-2xl font-bold text-gray-100" style={{fontFamily: 'var(--font-cubano, "Arial Black", sans-serif)', fontWeight: 400}}>
              Deploy with Simple Commands
            </h3>
          </div>
          <div className="bg-black rounded-lg p-6 text-sm" style={{fontFamily: 'var(--font-jetbrains, "Monaco", monospace)'}}>
            {cliCommands.map((cmd, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-green-400 mr-2">❯</span>
                <span className="text-gray-300">{cmd}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Railway Style */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-100" style={{fontFamily: 'var(--font-cubano, "Arial Black", sans-serif)', fontWeight: 400}}>
          DeployX supports great software teams wherever they are
        </h2>
        <p className="text-center text-gray-400 mb-16" style={{fontFamily: 'var(--font-montserrat, "Helvetica", sans-serif)'}}>
          Hear from some of the teams building their products on DeployX
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
              <blockquote className="text-gray-300 mb-6 leading-relaxed" style={{fontFamily: 'var(--font-montserrat, "Helvetica", sans-serif)'}}>
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-bold text-gray-100">{testimonial.author}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Twitter-style Social Proof */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {twitterTweets.map((tweet, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-300">👤</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-300 text-sm mb-1">{tweet.user}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{tweet.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gray-900 rounded-2xl p-12 border border-gray-700">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6 text-gray-100" style={{fontFamily: 'var(--font-cubano, "Arial Black", sans-serif)', fontWeight: 400}}>
            A better future is now boarding
          </h2>
          <p className="text-xl text-gray-300 mb-8" style={{fontFamily: 'var(--font-montserrat, "Helvetica", sans-serif)'}}>
            Deploy your first project today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{fontFamily: 'var(--font-jetbrains, "Monaco", monospace)'}}>
            <a 
              href="/signup"
              className="bg-white text-gray-900 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 hover:bg-gray-200 hover:scale-105"
            >
              Start Deploying →
            </a>
            <a 
              href="/docs"
              className="bg-gray-800 text-gray-100 border border-gray-600 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 hover:bg-gray-700 hover:border-gray-500"
            >
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-gray-800" />
              </div>
              <span className="text-xl font-bold text-gray-100">DeployX</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
              <Github className="w-5 h-5 hover:text-gray-300 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}