import { Suspense, useState } from "react";
import emailjs from "@emailjs/browser"
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Canvas } from "@react-three/fiber";
import { Fox } from "../models/Fox";
import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { Loader } from "../components"

const Contact = () => {
  const [Form, setForm] = useState({ name: "", email: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setisOpen] = useState(false)
  const [Animation, setAnimation] = useState("idle")

  console.log(Animation)

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value })
  }

  const handleFocus = () => {
      setAnimation("walk")
  }

  const handleBlur = () => {
      setAnimation("idle")

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setAnimation("hit")
    await emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: Form.name,
        to_name: "John",
        from_email: Form.email,
        to_email: "generea055@gmail.com",
        message: Form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then((response) => {
      setIsLoading(false)
      
      if (response.status == 200) {
        setisOpen(true)
        setTimeout(() => {
          setisOpen(false)
        }, 5000);
        setAnimation("idle")
        setForm({ name: "", email: "", message: "" })
      }
    }).catch((error) => {
      setAnimation("idle")
      setIsLoading(false)
      console.log(error)
    })

  }

  

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {isOpen &&
        <div className="fixed bottom-2 right-2">
          <Alert status='success' variant='solid'>
            <AlertIcon />
            Email was sent succefully!
          </Alert>
        </div>
      }
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7 mt-14">

          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              placeholder="John"
              className="input"
              required
              value={Form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="input"
              required
              value={Form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows={4}
              placeholder="Let me know how I can help you!"
              className="input"
              required
              value={Form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </label>
          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="h-[350px] md:h-[550px] w-full lg:w-1/2 lg:h-auto">
        <Canvas shadows camera={{position:[2,3,14],fov:30}}>
          <Environment preset="sunset" />
          <Suspense fallback={<Loader />}>
            <Stage adjustCamera={false} intensity={0.5} shadows="contact" environment="city">
              <Fox
                position={[0, -1.7, 0]}
                rotation={[0, -0.5, 0]}
                scale={0.5}
                Animation={Animation}
              />
            </Stage>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}


export default Contact;
