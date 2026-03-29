"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Traffic Light Management System",
    description: "Designed an optimized system for traffic control in urban environments, enhancing public safety with reduced time complexity.",
    tags: ["Systems Integration", "Optimization", "Python"],
    link: "#"
  },
  {
    title: "AI-Based Object Detection System",
    description: "Built real-time object detection using OpenCV and Python with multithreading. Integrated detection pipeline into application layer.",
    tags: ["OpenCV", "Python", "Multithreading", "Machine Learning"],
    link: "#"
  },
  {
    title: "Vision-Controlled Robotic Hand",
    description: "Developed gesture-controlled robotic system using computer vision and sensors to enhance autonomy in human-machine interaction.",
    tags: ["Computer Vision", "Sensors", "Robotics"],
    link: "#"
  },
  {
    title: "AI Airplane Detection & Tracking",
    description: "YOLO-based tracking system for autonomous detection in video streams. Scalable system for real-time processing in critical environments.",
    tags: ["YOLO", "Video Processing", "Real-time Systems"],
    link: "#"
  },
  {
    title: "AI Virtual Mouse",
    description: "Created gesture-based virtual interface using computer vision and tracking algorithms for real-time touchless cursor control.",
    tags: ["Computer Vision", "HCI", "Tracking Algorithms"],
    link: "#"
  },
  {
    title: "Drone Simulation / Path Planning",
    description: "Exploring ROS-based simulation for autonomous drone navigation and control; studying path planning and system architecture for drone fleets.",
    tags: ["ROS", "Drone Autonomy", "Path Planning"],
    link: "#"
  }
];

export default function Projects() {
  return (
    <section className="relative w-full bg-[#121212] py-32 px-4 md:px-12 z-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white text-center">
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.a
              key={project.title}
              href={project.link}
              target={project.link === "#" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 transition-all hover:bg-white/10 h-full"
            >
              {/* Subtle hover glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[50px] bg-white/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
