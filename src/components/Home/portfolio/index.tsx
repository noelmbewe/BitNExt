"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePrefix } from "@/utils/utils";

// Define features for the About section
const aboutFeatures = [
  {
    image: "/images/icons/icon-p2p.svg",
    title: "Peer-to-Peer Trading",
    description: "Trade directly with others, choosing your preferred cryptocurrencies and payment methods."
  },
  {
    image: "/images/icons/icon-escrow.svg",
    title: "Secure Escrow",
    description: "Funds are held safely in escrow until both parties confirm the trade is complete."
  },
  {
    image: "/images/icons/icon-payment.svg",
    title: "Flexible Payments",
    description: "Use bank transfers, M-Pesa, or PayPal for seamless transactions."
  },
];

const Portfolio = () => {
  return (
    <section className="md:pt-48 sm:pt-28 pt-12" id="about">
      <div className="container mx-auto lg:max-w-screen-xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 items-center gap-20">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:-ml-32"
          >
            <Image
              src={`${getImagePrefix()}images/about/img-about-bitmane.png`}
              alt="Bitmane platform illustration"
              width={780}
              height={700}
            />
          </motion.div>

          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="sm:text-28 text-18 text-muted mb-4">
              About <span className="text-primary">Bitmane</span>
            </p>
            <h2 className="text-white sm:text-40 text-30 mb-4 font-medium">
              Empowering secure crypto trading with{" "}
              <span className="text-primary">Bitmane</span>
            </h2>
            <p className="text-muted text-opacity-60 text-18 mb-6">
              Bitmane is your trusted platform for peer-to-peer cryptocurrency trading, offering secure escrow and flexible payment options for users in Malawi and beyond.
            </p>

            <table className="w-full sm:w-[80%]">
              <tbody>
                {aboutFeatures.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-b border-dark_border border-opacity-10"
                  >
                    <td className="py-5">
                      <div className="bg-primary p-4 rounded-full bg-opacity-20 w-fit">
                        <Image
                          src={`${getImagePrefix()}${feature.image}`}
                          alt={`${feature.title} icon`}
                          width={35}
                          height={35}
                        />
                      </div>
                    </td>
                    <td className="py-5">
                      <h4 className="text-muted sm:text-28 text-22 ml-5">
                        {feature.title}
                      </h4>
                      <p className="text-muted text-opacity-60 text-16 ml-5 mt-1">
                        {feature.description}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
