import React from "react";

export default function LandingPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              Welcome to Our Platform
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              A brief description of what your platform offers
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="rounded-md bg-primary px-6 py-2 text-primary-foreground">
                Get Started
              </button>
              <button className="rounded-md border border-input bg-background px-6 py-2">
                Learn More
              </button>
            </div>
          </div>
        </section>
  
        {/* Features section */}
        <section className="py-12">
          <h2 className="mb-8 text-center text-3xl font-bold">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Feature One</h3>
              <p className="text-muted-foreground">Description of feature one</p>
            </div>
            
            {/* Feature 2 */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Feature Two</h3>
              <p className="text-muted-foreground">Description of feature two</p>
            </div>
            
            {/* Feature 3 */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Feature Three</h3>
              <p className="text-muted-foreground">Description of feature three</p>
            </div>
          </div>
        </section>
  
        {/* About section */}
        <section className="py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold">About Us</h2>
              <p className="mb-4 text-muted-foreground">
                Brief description about your company or project.
              </p>
              <p className="text-muted-foreground">
                Additional information about your mission and values.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-64 w-full rounded-lg bg-muted"></div>
            </div>
          </div>
        </section>
  
        {/* Contact section */}
        <section className="py-12">
          <h2 className="mb-8 text-center text-3xl font-bold">Contact Us</h2>
          <div className="mx-auto max-w-md">
            <div className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border p-2"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Message</label>
                <textarea 
                  className="w-full rounded-md border p-2" 
                  rows={4}
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
                Send Message
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
  