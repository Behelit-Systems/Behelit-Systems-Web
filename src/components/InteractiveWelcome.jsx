import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// Import GSAP plugins. SplitText and ScrambleTextPlugin are typically premium plugins.
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

// Register GSAP plugins. This is crucial for them to work.
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

// Define the InteractiveWelcome functional component.
// This component will display a canvas-based particle animation as a background,
// with a central, interactive scramble text effect.
const InteractiveWelcome = () => {
  // Ref for the canvas element (background particles).
  const canvasRef = useRef(null);
  // Ref to store the GSAP timeline for canvas particles.
  const canvasTimelineRef = useRef(null);

  // Ref for the central text element.
  const centralTextRef = useRef(null);
  // Ref to hold the SplitText instance for the central text.
  let centralSplitTextInstance = useRef(null);

  // Define the set of characters to be used as background particles.
  const particleChars = ['0', '1', '*', '#', '+', '-', '=', '<', '>', '/', '\\', 'c', 'L', 'b', 's'];
  // Define the phrase for the central scramble text.
  const centralPhrase = "cLc Labs";

  // useEffect hook to run GSAP animations after the component mounts.
  useEffect(() => {
    // Ensure all necessary refs are available before proceeding.
    if (!canvasRef.current || !centralTextRef.current) {
      return;
    }

    // --- Cleanup from previous renders ---
    // Clear all global GSAP tweens and timelines to ensure a fresh start on re-renders.
    gsap.globalTimeline.clear();

    // --- Canvas Particle Animation Setup ---
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let cw = (c.width = window.innerWidth);
    let ch = (c.height = window.innerHeight);
    let radius = Math.max(cw, ch); // Radius for initial particle positioning.
    const particles = Array(99); // Number of particles.

    // Initialize particles with text content.
    for (let i = 0; i < particles.length; i++) {
      particles[i] = {
        x: 0,
        y: 0,
        scale: 0,
        rotate: 0,
        // Assign a character from the predefined list for background particles.
        text: particleChars[i % particleChars.length]
      };
    }

    // Function to draw particles on the canvas.
    function draw() {
      // Sort particles by scale to ensure correct z-indexing (smaller particles drawn first, creating depth).
      particles.sort((a, b) => a.scale - b.scale);
      ctx.clearRect(0, 0, cw, ch); // Clear the entire canvas for each frame.

      particles.forEach((p) => {
        ctx.save(); // Save the current canvas state.
        ctx.translate(cw / 2, ch / 2); // Move origin to the center of the canvas.
        ctx.rotate(p.rotate); // Rotate the canvas context based on particle's rotation.

        // Set font style for the text particle.
        // Increased base font size for clearer background particles.
        ctx.font = `${p.scale * 80}px 'Pathway Gothic One', sans-serif`; // Base size 80px, scaled.
        // Increased opacity for clearer background particles.
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; // Increased opacity to 0.6.
        ctx.textAlign = 'center'; // Center text horizontally.
        ctx.textBaseline = 'middle'; // Center text vertically.

        // Draw the text particle.
        ctx.fillText(p.text, p.x, p.y);

        ctx.restore(); // Restore the canvas state to prevent transformations from accumulating.
      });
    }

    // Start canvas animation.
    canvasTimelineRef.current = gsap.timeline({ onUpdate: draw })
      .fromTo(particles, {
        // Initial positions for particles, creating a wider swirling effect around a larger radius.
        x: (i) => {
          const angle = (i / particles.length * Math.PI * 2) - Math.PI / 2;
          return Math.cos(angle * 10) * radius * 1.5; // Multiplied radius by 1.5 for wider spread.
        },
        y: (i) => {
          const angle = (i / particles.length * Math.PI * 2) - Math.PI / 2;
          return Math.sin(angle * 10) * radius * 1.5; // Multiplied radius by 1.5 for wider spread.
        },
        scale: 1.1, // Start slightly larger
        rotate: 0
      }, {
        duration: 5, // Duration of the animation for each particle.
        ease: "sine", // Easing function.
        x: 0,
        y: 0,
        scale: 0, // Shrink to 0 as it moves to the center.
        rotate: -3, // Rotate slightly.
        stagger: { each: -0.05, repeat: -1 } // Staggered animation, repeating indefinitely.
      }, 0)
      .seek(99); // Start at a high seek value to make the animation appear continuous from the start.

    // Canvas resize handler: updates canvas dimensions and invalidates timeline.
    const handleCanvasResize = () => {
      cw = c.width = window.innerWidth;
      ch = c.height = window.innerHeight;
      radius = Math.max(cw, ch); // Recalculate radius based on new dimensions.
      if (canvasTimelineRef.current) {
        canvasTimelineRef.current.invalidate(); // Invalidate timeline to re-calculate positions based on new radius.
      }
    };
    window.addEventListener("resize", handleCanvasResize);

    // Canvas play/pause on pointerup: toggles the timeScale of the canvas animation.
    const handleCanvasPointerUp = () => {
      if (canvasTimelineRef.current) {
        gsap.to(canvasTimelineRef.current, {
          timeScale: canvasTimelineRef.current.isActive() ? 0 : 1
        });
      }
    };
    c.addEventListener('pointerup', handleCanvasPointerUp);


    // --- Central Scramble Text Animation Setup ---
    // Initialize SplitText on the central text element.
    centralSplitTextInstance.current = new SplitText(centralTextRef.current, { type: 'chars' });
    const centralChars = centralSplitTextInstance.current.chars;

    // Set initial properties for the central characters and start the scramble animation.
    // Increased initial 'y' for a more pronounced entrance.
    gsap.set(centralChars, { opacity: 0, y: 40 }); // Start hidden and slightly below.

    gsap.timeline({ repeat: -1, yoyo: true, delay: 1 }) // Loop and yoyo the animation.
      .to(centralChars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05, // Stagger appearance of characters.
        onComplete: () => {
          // Once visible, start the continuous scramble effect.
          gsap.to(centralChars, {
            scrambleText: {
              text: centralPhrase, // Target text is the full phrase.
              // Wider range of characters for a more dynamic scramble.
              chars: "!@#$%^&*()_+-=[]{}|;:'\",.<>/?`",
              // Slightly faster scramble speed.
              speed: 1.2, // Increased speed to 1.2.
              newClass: 'scrambled-char' // Optional class for scrambled chars if needed.
            },
            // Shorter duration for one scramble cycle for a more active effect.
            duration: 1.5, // Reduced duration to 1.5.
            ease: 'none',
            repeat: -1, // Repeat indefinitely.
            yoyo: true // Scramble forward and then backward.
          });
        }
      });


    // --- Overall Cleanup for useEffect (runs on component unmount) ---
    return () => {
      // Remove event listeners
      window.removeEventListener("resize", handleCanvasResize);
      c.removeEventListener('pointerup', handleCanvasPointerUp);

      // Kill GSAP timelines
      if (canvasTimelineRef.current) {
        canvasTimelineRef.current.kill();
      }
      // Revert SplitText changes for central text.
      if (centralSplitTextInstance.current) {
        centralSplitTextInstance.current.revert();
      }
      gsap.globalTimeline.clear(); // Ensure all global tweens are cleared on unmount.
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render.

  // Render the canvas element and the central text element.
  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }}></canvas>
      <div
        ref={centralTextRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10, // Ensure it's in front of the canvas
          color: '#fff', // White color for the central text
          fontSize: 'clamp(3rem, 8vw, 6rem)', // Responsive font size
          fontFamily: "'Pathway Gothic One', sans-serif", // Apply the font
          textAlign: 'center',
          whiteSpace: 'nowrap', // Keep text on one line if possible
          userSelect: 'none', // Prevent text selection
          pointerEvents: 'none' // Allow clicks to pass through to canvas
        }}
      >
        {centralPhrase}
      </div>
    </>
  );
};

export default InteractiveWelcome; // Export the component for use in Astro.


