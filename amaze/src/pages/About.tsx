import { useState, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { feedbackStart, feedbackSuccess, feedbackError } from "../features/feedbackSlice";

interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

// ✅ mock API
const sendFeedbackAPI = async (data: FeedbackData): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate delay
  if (!data.name || !data.email || !data.message) {
    throw new Error("All fields are required!");
  }
  return { success: true };
};

// ✅ animation variants with correct typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const inputVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } },
};

export function About() {
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: (data: FeedbackData) => sendFeedbackAPI(data),
    onMutate: () => dispatch(feedbackStart()),
    onSuccess: () => {
      dispatch(feedbackSuccess());
      gsap.to(".thank-you", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error: Error) => dispatch(feedbackError(error.message || "Feedback failed")),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";
    buttonRef.current.appendChild(ripple);

    gsap.to(ripple, { scale: 1, opacity: 0, duration: 0.6, ease: "power2.out" });
    setTimeout(() => ripple.remove(), 600);
  };

  

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-black p-6"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 w-full max-w-lg space-y-6 border border-gray-700 shadow-lg shadow-yellow-900/40"
        variants={inputVariants}
      >
        <motion.h1
          className="text-3xl font-bold text-center text-white mb-4 tracking-wide"
          variants={inputVariants}
        >
          💬 We Value Your Feedback
        </motion.h1>

        {/* Name */}
        <motion.div variants={inputVariants}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
        </motion.div>

        {/* Email */}
        <motion.div variants={inputVariants}>
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          />
        </motion.div>

        {/* Message */}
        <motion.div variants={inputVariants}>
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 min-h-[120px]"
          />
        </motion.div>

        {/* Submit */}
        <motion.button
          ref={buttonRef}
          onMouseDown={handleRipple}
          type="submit"
          disabled={mutation.isPending}
          className="relative overflow-hidden w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
        >
          {mutation.isPending ? "Sending..." : "Send Feedback"}
        </motion.button>

        {/* Error */}
        {mutation.isError && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-center"
          >
            {mutation.error instanceof Error ? mutation.error.message : "Feedback failed"}
          </motion.p>
        )}

        {/* Success */}
        {mutation.isSuccess && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-400 text-center font-bold drop-shadow-[yellow]"
        >
          🎉 Thank you for your feedback!
        </motion.p>
      )}
      
      </motion.form>
      
    </motion.div>
    
  );
}
