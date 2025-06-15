"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getImagePrefix } from "@/utils/utils";

const Work = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  const bottomAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  const steps = [
    {
      icon: "/images/icons/icon-trade.svg",
      text: "Create Your Trade Offer",
      description: "Choose whether to buy or sell, select currencies like USD, MWK, BTC, or ETH, and set your price and amount.",
    },
    {
      icon: "/images/icons/icon-payment.svg",
      text: "Select Payment Method",
      description: "Pick secure payment options such as bank transfer, M-Pesa, or PayPal to complete your trade.",
    },
    {
      icon: "/images/icons/icon-escrow.svg",
      text: "Trade with Escrow",
      description: "Use our escrow service to ensure funds are safely held until both parties confirm the trade.",
    },
  ];

  return (
    <section className="md:pt-28" id="how-it-works">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div ref={ref} className="grid grid-cols-12 items-center">
          <motion.div
            {...bottomAnimation}
            className="lg:col-span-7 col-span-12"
          >
            <p className="sm:text-28 text-18 text-white">
              Trade with <span className="text-primary">Bitmane</span>
            </p>
            <h2 className="sm:text-40 text-30 text-white lg:w-full md:w-70% font-medium">
              Easily buy and sell cryptocurrencies securely.
            </h2>
            <div className="grid md:grid-cols-2 gap-7 mt-11">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="flex items-center gap-5">
                    <div className="px-5 py-5 bg-light_grey bg-opacity-30 rounded-full">
                      <Image
                        src={`${getImagePrefix()}${step.icon}`}
                        alt={`${step.text} icon`}
                        width={40}
                        height={40}
                      />
                    </div>
                    <p className="text-24 text-muted">{step.text}</p>
                  </div>
                  <p className="text-16 text-muted ml-16">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...TopAnimation} className="lg:col-span-5 col-span-12">
            <div className="2xl:-mr-40 mt-9 flex justify-center">
              <Image
                src={`${getImagePrefix()}images/work/img-trading-process.png`}
                alt="Bitmane trading process illustration"
                width={600}
                height={425}
                className="lg:w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default Work;
