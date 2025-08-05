import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xl font-bold text-financial">CryptoFolio</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 animate-fade-in">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</a>
            <a href="#security" className="text-gray-300 hover:text-white transition-colors">Security</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center space-x-4 animate-fade-in">
            <Link
              href="/auth/login"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="glass-button px-6 py-2 rounded-lg font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="animate-slide-in-left">
                <h1 className="text-5xl md:text-7xl font-bold text-financial leading-tight">
                  Professional
                  <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Crypto Portfolio
                  </span>
                  Management
                </h1>
              </div>
              
              <div className="animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Track, analyze, and optimize your cryptocurrency investments with real-time data, 
                  advanced analytics, and professional-grade portfolio management tools.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                <Link
                  href="/auth/register"
                  className="glass-button px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/dashboard"
                  className="border border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-green-400 hover:text-green-400 transition-all duration-300 text-center"
                >
                  View Demo
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 animate-slide-in-left" style={{animationDelay: '0.6s'}}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-financial-mono animate-count-up">500K+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-financial-mono animate-count-up">$2.5B+</div>
                  <div className="text-gray-400 text-sm">Assets Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-financial-mono animate-count-up">99.9%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Dashboard Preview */}
            <div className="relative animate-slide-in-right">
              <div className="portfolio-card animate-float">
                <div className="space-y-6">
                  {/* Portfolio Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Total Portfolio Value</h3>
                      <div className="text-3xl font-bold text-financial-mono text-white">$125,432.89</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="status-positive text-sm">+$3,247.21</span>
                        <span className="status-positive text-sm">(+2.67%)</span>
                        <span className="text-gray-400 text-sm">24h</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse-glow">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Chart Preview */}
                  <div className="chart-container">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)" />
                          <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 150 Q 50 120 100 100 T 200 80 T 300 60 T 400 40"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-scale-in"
                        style={{animationDelay: '1s'}}
                      />
                      <path
                        d="M 0 150 Q 50 120 100 100 T 200 80 T 300 60 T 400 40 L 400 200 L 0 200 Z"
                        fill="url(#chartGradient)"
                        className="animate-scale-in"
                        style={{animationDelay: '1.2s'}}
                      />
                    </svg>
                  </div>
                  
                  {/* Top Holdings */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-300">Top Holdings</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">₿</span>
                          </div>
                          <div>
                            <div className="font-medium">Bitcoin</div>
                            <div className="text-gray-400 text-sm">1.2345 BTC</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-financial-mono">$52,291</div>
                          <div className="status-positive text-sm">+1.23%</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Ξ</span>
                          </div>
                          <div>
                            <div className="font-medium">Ethereum</div>
                            <div className="text-gray-400 text-sm">12.456 ETH</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-financial-mono">$32,137</div>
                          <div className="status-positive text-sm">+2.45%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-financial mb-4">
              Professional-Grade Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage your cryptocurrency portfolio like a professional trader
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="portfolio-card group animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Portfolio Tracking</h3>
              <p className="text-gray-400">
                Monitor your investments with live price updates, performance metrics, and comprehensive portfolio analysis.
              </p>
            </div>
            
            <div className="portfolio-card group animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
              <p className="text-gray-400">
                Deep dive into market trends, correlation analysis, and predictive insights powered by machine learning.
              </p>
            </div>
            
            <div className="portfolio-card group animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fee Optimization</h3>
              <p className="text-gray-400">
                Track transaction fees, funding costs, and optimize your trading strategy to maximize returns.
              </p>
            </div>
            
            <div className="portfolio-card group animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.99-2a9 9 0 11-4.49 7.43" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Exchange Support</h3>
              <p className="text-gray-400">
                Connect multiple exchanges and wallets for a unified view of your entire cryptocurrency portfolio.
              </p>
            </div>
            
            <div className="portfolio-card group animate-slide-up" style={{animationDelay: '0.5s'}}>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Bank-Level Security</h3>
              <p className="text-gray-400">
                Military-grade encryption, 2FA, and cold storage integration to keep your assets secure.
              </p>
            </div>
            
            <div className="portfolio-card group animate-slide-up" style={{animationDelay: '0.6s'}}>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
              <p className="text-gray-400">
                Get personalized recommendations and market insights powered by advanced AI algorithms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-financial mb-6">
              Ready to Take Control of Your
              <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Crypto Portfolio?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professional traders and investors who trust CryptoFolio 
              to manage their cryptocurrency investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="glass-button px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
              >
                Start Your Free Trial
              </Link>
              <Link
                href="/auth/login"
                className="border border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-green-400 hover:text-green-400 transition-all duration-300"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-financial">CryptoFolio</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional cryptocurrency portfolio management for serious investors.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Features</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Pricing</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">API</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Security</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">About</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Blog</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Careers</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Help Center</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Community</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Status</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Terms</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 CryptoFolio. All rights reserved. Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}