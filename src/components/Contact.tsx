import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const inputClass =
  "w-full bg-white text-[#333] px-5 py-5 rounded text-base focus:outline-none focus:ring-2 focus:ring-primary";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await fetch("https://formspree.io/blakemsteel@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _replyto: data.email }),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-dark text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/img/map-image.png')" }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold uppercase text-4xl tracking-wider">
            Contact
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <input
                  {...register("name", { required: "Please enter your name." })}
                  type="text"
                  placeholder="Your Name *"
                  className={inputClass}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("email", {
                    required: "Please enter your email address.",
                  })}
                  type="email"
                  placeholder="Your Email *"
                  className={inputClass}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("phone", {
                    required: "Please enter your phone number.",
                  })}
                  type="tel"
                  placeholder="Your Phone *"
                  className={inputClass}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <textarea
                {...register("message", {
                  required: "Please enter a message.",
                })}
                placeholder="Your Message *"
                className={`${inputClass} flex-1 min-h-[200px] resize-none`}
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            {status === "success" && (
              <p className="text-primary mb-4 font-montserrat font-bold">
                Your message has been sent. Thank you!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 mb-4 font-montserrat">
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-primary border-2 border-primary text-white font-montserrat font-bold uppercase text-lg px-10 py-5 rounded hover:bg-[#5da84e] hover:border-[#5da84e] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
