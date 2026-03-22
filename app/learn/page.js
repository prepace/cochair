"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LearnPage() {
  useEffect(() => {
    // Load HubSpot form script
    const script = document.createElement("script");
    script.src = "//js-na2.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      // Create the form once the script is loaded
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "242854447",
          formId: "f745b7ab-60ed-4077-a178-be0f21022c70",
          region: "na2",
          target: "#hubspot-form-container",
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen theme-bg">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight theme-fg">
              Learn More About <span className="theme-primary-text">CoachAir</span>
            </h1>

            <div className="text-lg md:text-xl leading-relaxed theme-muted-text space-y-6 text-left">
              <p>
                CoachAir is building a modern aviation intelligence platform designed to bring more trust, visibility, and efficiency to private aviation.
              </p>

              <p>
                Private aviation continues to rely on fragmented communication, manual processes, and limited transaction transparency. CoachAir is being developed to help solve that by creating a more structured and accountable layer for charter-related workflows, industry intelligence, and operational coordination.
              </p>

              <p>
                Our vision is to support operators, brokers, FBOs, aviation service providers, and other key stakeholders with tools that improve workflow clarity, strengthen confidence, and create a more professional experience across the aviation ecosystem.
              </p>

              <p>
                If you are interested in learning more about CoachAir, our progress, and how the platform may support your organization, complete the form below. We will follow up with additional information.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 theme-secondary">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold theme-fg mb-4">
                Fill out the form below to connect with CoachAir and receive more information.
              </h2>
            </div>

            {/* HubSpot Form Container */}
            <div className="theme-card border theme-border rounded-xl p-8 shadow-lg backdrop-blur-sm">
              <div id="hubspot-form-container" className="hubspot-form"></div>
            </div>

            {/* Privacy Note */}
            <div className="text-center">
              <p className="text-sm theme-muted-text italic">
                Your information will only be used for CoachAir-related updates and follow-up.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
