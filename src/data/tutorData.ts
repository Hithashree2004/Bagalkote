export interface MCQ {
  q: string;
  o: string[];
  a: string;
  explanation: string; // Added detailed explanation field
}

export interface MockTestQ {
  q: string;
  options: string[];
  answer: string;
}

export interface ModeContent {
  explanation?: string;
  concepts?: string[];
  examples?: string[];
  mcqs?: MCQ[];
  notes?: string;
  formulas?: string[];
  numericals?: string[];
  advanced_explanation?: string;
  difficult_problems?: string[];
  mock_test?: MockTestQ[];
  points?: string[];
}

export interface Chapter {
  basic: ModeContent;
  intermediate: ModeContent;
  pro: ModeContent;
  revision: ModeContent;
}

export interface SubjectData {
  [chapterName: string]: Chapter;
}

export const tutorData: Record<string, SubjectData> = {
  Physics: {
    "Motion and Dynamics": {
      basic: {
        explanation: "Motion is the change in position of an object over time. Understanding motion is the foundational step in physics, allowing us to quantify how things move in our universe.",
        points: [
          "1. Scalar vs Vector quantities: In the vast world of physics, scalars are quantities that represent magnitude alone, such as the total mass of an object or the speed of a vehicle. On the other hand, vectors are significantly more complex as they must include both a numerical value and a specific direction, like the velocity of a spacecraft or the gravitational force acting on a planet. Understanding this fundamental difference is the absolute first step in accurately modeling physical systems in multi-dimensional space.",
          "2. Distance is defined as the total cumulative length of the actual path traversed by an object during its motion. Because it only accounts for the total ground covered regardless of the direction shifts, it is strictly a scalar quantity and can never result in a negative value. Whether you walk in circles or a straight line, your distance will always increase as long as you are moving, making it a reliable measure of total mechanical work done by a system.",
          "3. Displacement is a much more specific vector quantity that represents the shortest possible straight-line distance between an object's starting point and its final position. Unlike distance, displacement cares deeply about the direction; if you return to your starting point after a long journey, your total displacement is mathematically zero. This property makes it essential for calculating net changes in position in complex engineering and physics problems.",
          "4. Speed is the mathematical rate at which an object covers distance over a specific period of time. It provides a simple scalar value that tells us how fast something is moving but leaves us completely in the dark regarding which direction it is heading. For example, knowing a car is moving at 100 km/h is useful for speed limits, but it doesn't tell a navigator if the car is heading towards its destination or away from it.",
          "5. Velocity is the sophisticated vector counterpart of speed, representing the rate of change of an object's displacement. Because velocity includes direction, any change in a path—even if the speed remains constant—will result in a change in the overall velocity vector. This concept is particularly critical in circular motion, where an object may move at a constant speed but is constantly accelerating because its direction is perpetually shifting.",
          "6. Acceleration defines the precise rate at which an object's velocity changes over time. Any time an object speeds up, slows down, or suddenly alters its direction of travel, it is undergoing acceleration, typically caused by the application of an external net force. In the world of high-performance physics, acceleration is the bridge between kinematics and dynamics, governed by Newton's Second Law which relates force, mass, and acceleration.",
          "7. Uniform motion occurs when an object covers exactly equal distances in equal intervals of time along a perfectly straight path. This implies that the object is traveling at a constant velocity, meaning both its speed and its direction are remaining unchanged throughout the entire observation period. In such a scenario, the net acceleration of the system is precisely zero, representing a state of dynamic equilibrium often studied in frictionless environments.",
          "8. Non-uniform motion describes the vast majority of real-world movements where objects vary their speed or direction over time. Whether it is a ball rolling down a bumpy hill or a car navigating through city traffic, these systems require advanced mathematical tools like calculus or average values to describe effectively. Understanding non-uniform motion is vital for designing safety systems, as it allows us to predict peak forces and energy changes.",
          "9. Instantaneous speed refers to the specific speed of a moving object at one particular, infinitely small point in time. This is the exact value that a driver sees on their automobile's speedometer at any given second during a drive. While average speed gives a general overview of a trip, instantaneous speed is what actually matters for avoiding collisions and adhering to local traffic laws in real-time environments.",
          "10. Average speed is calculated by taking the total distance covered by an object and dividing it by the total time elapsed during the entire journey. It provides a global, macro-level perspective of the motion without getting bogged down by the individual speed fluctuations that might occur second-to-second. This value is extremely helpful for travel planning and estimating arrival times across long-distance transportation networks.",
          "11. Relative motion describes how one object's movement appears from the perspective of another moving object. This is why a passing train can look slower or faster than it is.",
          "12. Frames of reference are the coordinate systems used to measure position and motion. Choosing the right frame (like the Earth vs a moving car) simplifies complex physics problems.",
          "13. Motion in a straight line is called rectilinear motion. It is the simplest form of motion where variables only change along a single axis (x, y, or z).",
          "14. The slope of a distance-time graph represents the speed of the object. A steeper line indicates a higher speed, while a horizontal line means the object is at rest.",
          "15. The slope of a velocity-time graph represents the acceleration. A positive slope shows speeding up, while a negative slope shows the object is decelerating or braking.",
          "16. The area under a velocity-time graph represents the total displacement. This is a powerful geometric tool for calculating distance without using complex algebraic formulas.",
          "17. Inertia is the tendency of an object to resist changes in its state of motion. Mass is the quantitative measure of inertia; more mass means it is harder to change the object's velocity.",
          "18. Gravity is a universal force that causes objects to accelerate towards the Earth at approximately 9.8 m/s^2. This constant value is crucial for all free-fall calculations.",
          "19. Terminal velocity is reached when the force of air resistance equals the force of gravity. At this point, a falling object stops accelerating and maintains a constant speed.",
          "20. Friction is a force that opposes the relative motion of two surfaces in contact. It can be static (preventing start) or kinetic (opposing current motion), and depends on surface texture."
        ],
        mcqs: Array.from({ length: 30 }, (_, i) => ({
          q: `Physics Practice Question ${i + 1}: What is the fundamental unit of ${i % 2 === 0 ? 'force' : 'acceleration'}?`,
          o: ["Newton", "m/s^2", "Joule", "Watt"],
          a: i % 2 === 0 ? "Newton" : "m/s^2",
          explanation: i % 2 === 0 
            ? "The Newton (N) is the SI unit of force, defined as the amount of force required to accelerate 1kg of mass at 1m/s^2. It is named after Sir Isaac Newton for his laws of motion." 
            : "Acceleration is the rate of change of velocity, measured in meters per second squared (m/s^2). It represents how many m/s the velocity changes every single second."
        }))
      },
      intermediate: {
        notes: "Detailed study of equations of motion under constant acceleration.",
        formulas: ["v = u + at", "s = ut + 1/2at^2", "v^2 = u^2 + 2as"]
      },
      pro: {
        mock_test: Array.from({ length: 10 }, (_, i) => ({
          q: `Pro Level Question ${i + 1}: Compound motion dynamics...`,
          options: ["Opt A", "Opt B", "Opt C", "Opt D"],
          answer: "Opt A"
        }))
      },
      revision: {
        points: Array.from({ length: 30 }, (_, i) => `${i + 1}. Essential Revision Point: ${i % 3 === 0 ? 'Focus on Vector addition rules.' : i % 3 === 1 ? 'Remember Earth gravity is 9.8ms-2.' : 'Check the area under VT graphs.'} This is a critical reminder for your upcoming competitive exams like JEE and NEET.`),
        notes: "Quick check-list for kinematics."
      }
    }
  },
  Chemistry: {
    "Atomic Structure": {
      basic: {
        points: Array.from({ length: 20 }, (_, i) => `${i + 1}. Detailed Basic Point: Atomic models have evolved from simple spheres to complex quantum clouds. ${i % 2 === 0 ? 'Electrons occupy specific energy levels called shells.' : 'Protons and neutrons reside in the dense central nucleus.'} This conceptual clarity is essential for understanding chemical bonding.`),
        mcqs: Array.from({ length: 30 }, (_, i) => ({
          q: `Chemistry Question ${i + 1}: Which subatomic particle has a ${i % 2 === 0 ? 'positive' : 'negative'} charge?`,
          o: ["Proton", "Electron", "Neutron", "Positron"],
          a: i % 2 === 0 ? "Proton" : "Electron",
          explanation: i % 2 === 0 
            ? "Protons carry a positive charge (+1) and are located in the nucleus. The number of protons determines the atomic number and the identity of the element."
            : "Electrons carry a negative charge (-1) and revolve around the nucleus in specific orbitals. They are responsible for the chemical reactivity and bonding of the atom."
        }))
      },
      intermediate: { notes: "Advanced orbital theory and electron configuration." },
      pro: { advanced_explanation: "Quantum mechanics and wave functions." },
      revision: {
        points: Array.from({ length: 30 }, (_, i) => `${i + 1}. Revision Point: ${i % 2 === 0 ? 'Valency determines bonding capacity.' : 'Isotopes have different neutron counts.'} Ensure you memorize the periodic trends before the exam.`)
      }
    }
  },
  Mathematics: {
    "Limits": {
      basic: {
        points: Array.from({ length: 20 }, (_, i) => `${i + 1}. Mathematical Concept: Limits allow us to study the behavior of functions as they approach a value. ${i % 2 === 0 ? 'The limit exists if LHL equals RHL.' : 'L-Hopital rule is used for 0/0 forms.'} Mastery of this is the key to mastering calculus.`),
        mcqs: Array.from({ length: 30 }, (_, i) => ({
          q: `Math Question ${i + 1}: Solve the following limit limit x->0 (sin x / x)...`,
          o: ["0", "1", "inf", "None"],
          a: "1",
          explanation: "This is a standard trigonometric limit derived using the Squeeze Theorem. As x approaches zero, the ratio of the sine of the angle to the angle itself (in radians) approaches unity."
        }))
      },
      intermediate: { notes: "Sandwich theorem and expansion series." },
      pro: { advanced_explanation: "Epsilon-Delta definition and limits at infinity." },
      revision: {
        points: Array.from({ length: 30 }, (_, i) => `${i + 1}. Revision Point: ${i % 2 === 0 ? 'Continuity implies limit existence.' : 'Derivatives are limits of slopes.'} Practice these identities daily.`)
      }
    }
  },
  Biology: {
    "Cell Structure": {
      basic: {
        points: Array.from({ length: 20 }, (_, i) => `${i + 1}. Biological Fact: Cells are the fundamental unit of all life. ${i % 2 === 0 ? 'The mitochondria generates ATP for the cell.' : 'The nucleus stores genetic information in DNA.'} Every living organism relies on the coordinated action of these organelles.`),
        mcqs: Array.from({ length: 30 }, (_, i) => ({
          q: `Biology Question ${i + 1}: Which organelle is known as the ${i % 2 === 0 ? 'Powerhouse' : 'Brain'} of the cell?`,
          o: ["Mitochondria", "Nucleus", "Ribosome", "Lysosome"],
          a: i % 2 === 0 ? "Mitochondria" : "Nucleus",
          explanation: i % 2 === 0 
            ? "Mitochondria are double-membraned organelles that perform cellular respiration and produce ATP, the energy currency of the cell."
            : "The nucleus contains the chromosomal DNA and acts as the control center, regulating gene expression and cellular division processes."
        }))
      },
      intermediate: { notes: "Membrane transport and organelle interaction." },
      pro: { advanced_explanation: "Endosymbiotic theory and cellular evolution." },
      revision: {
        points: Array.from({ length: 30 }, (_, i) => `${i + 1}. Revision Point: ${i % 2 === 0 ? 'Lysosomes are suicide bags.' : 'Plant cells have large vacuoles.'} Review the differences between prokaryotes and eukaryotes.`)
      }
    }
  }
};
