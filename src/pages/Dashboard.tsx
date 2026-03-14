import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, Image as ImageIcon, Sparkles, Gamepad2, X, Moon, Sun, Globe, Box, GraduationCap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ParticleBackground from '@/components/ParticleBackground';
import TutorWidget from '@/components/tutor/TutorWidget';
import DateTimeDisplay from '@/components/DateTimeDisplay';
import NewspaperSection from '@/components/NewspaperSection';
import Chatbot from '@/components/Chatbot';
import CurrentAffairsPanel from '@/components/CurrentAffairsPanel';
import RoadMapSection from '@/components/RoadMapSection';
import MultiModeTutor from '@/components/tutor/MultiModeTutor';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const educationalKeywords = [
  'math',
  'science',
  'physics',
  'chemistry',
  'biology',
  'history',
  'geography',
  'education',
  'literature',
  'language',
  'grammar',
  'economics',
  'finance',
  'accounting',
  'technology',
  'engineering',
  'computer',
  'programming',
  'coding',
  'astronomy',
  'geology',
  'medicine',
  'anatomy',
  'psychology',
  'sociology',
  'philosophy',
  'law',
  'statistics',
  'calculus',
  'algebra',
  'art',
  'music'
];

const curatedTopics = [
  {
    keywords: ["newton's second law", "newtons second law", "newton 2nd law"],
    topic: "Newton's Second Law",
    summaryLines: [
      "Newton's second law of motion is a fundamental principle in physics that describes the relationship between an object's mass and the amount of force needed to accelerate it.",
      "The law states that the acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.",
      "This can be expressed by the equation F = ma, where F is the net force applied, m is the mass of the object, and a is its acceleration.",
      "Force is a vector quantity, meaning it has both magnitude and direction. Acceleration is also a vector, and it always occurs in the direction of the net force.",
      "Mass is a scalar quantity and represents the amount of matter in an object, providing resistance to changes in its state of motion.",
      "The unit for force is the Newton (N), which is defined as the force required to accelerate one kilogram of mass at a rate of one meter per second squared (1 kg·m/s²).",
      "If the net force acting on an object is doubled, its acceleration will also double, provided the mass remains constant.",
      "Conversely, if the mass of an object is doubled, the same amount of force will produce only half the acceleration.",
      "This law explains why it is easier to push a bicycle than a car; the car's larger mass offers more inertia or resistance to acceleration.",
      "Inertia is closely linked to the second law, as it represents the tendency of an object to resist any change in its motion.",
      "The second law is applicable in everyday situations, from the design of sports equipment to the calculation of fuel needed for rocket launches.",
      "In automotive safety, the second law is used to understand how forces act on passengers during a collision and to design effective crumple zones and airbags.",
      "For athletes, understanding this law can help in improving performance, such as how much force a sprinter needs to apply against the blocks to achieve maximum acceleration.",
      "The law also forms the basis for more complex physical theories and is used extensively in engineering and structural design to ensure safety and efficiency.",
      "When multiple forces act on an object, the vector sum of these forces is the net force, which determines the overall acceleration.",
      "If the net force is zero, the object's acceleration is zero, which means it will either remain at rest or continue moving at a constant velocity.",
      "Friction is a common force that opposes motion and must be accounted for when calculating the net force in real-world scenarios.",
      "Air resistance is another type of force that affects falling objects and vehicles, often limiting their maximum acceleration.",
      "Gravity is a constant force acting on objects near Earth's surface, where the acceleration due to gravity is approximately 9.8 m/s².",
      "Weight is the force of gravity acting on an object's mass and is a direct application of the second law.",
      "Circular motion also involves the second law, where centripetal force is required to keep an object moving in a curved path.",
      "The second law can be reformulated in terms of momentum: Force is equal to the rate of change of momentum over time.",
      "This momentum formulation is more general and applies even when the mass of the object is changing, such as in a rocket as it burns fuel.",
      "Newton's second law is one of the three laws of motion that revolutionized our understanding of the physical world and laid the groundwork for modern physics and engineering.",
      "Engineers use the second law to calculate the tension in cables, the stress on bridges, and the power requirements for engines.",
      "In planetary science, the law helps determine the orbits of planets and the gravitational pull of stars.",
      "Biomechanics researchers use the second law to analyze human movement and develop prosthetics that mimic natural motion.",
      "The law is taught in physics courses worldwide as a cornerstone of mechanics, essential for solving problems involving motion and forces.",
      "It remains a highly accurate description of motion for objects at speeds much slower than the speed of light.",
      "At very high speeds or for extremely small particles, more advanced theories provide more accurate descriptions, but Newton's laws are still used for most practical applications.",
      "Understanding the second law is key to mastering higher-level physics topics like work, energy, and power.",
      "It allows us to predict the future state of a system if we know the forces currently acting upon it.",
      "The simplicity and power of the equation make it one of the most recognizable and important concepts in all of science.",
      "Every time you step on the gas in a car, throw a ball, or jump into the air, you are experiencing the second law in action.",
      "When a force is applied to an object, the resulting change in velocity is the acceleration, which is what the second law quantifies.",
      "Net force is the combined effect of all individual forces acting on an object, including tension, normal force, and external pushes or pulls.",
      "Objects with larger mass have more 'mechanical resistance' or inertia, meaning they require more force to change their velocity.",
      "The direction of the net force is identical to the direction of the resulting acceleration vector.",
      "This principle is used in the aerospace industry to calculate the thrust needed to overcome atmospheric drag and reach escape velocity.",
      "In architecture, the second law is used to ensure that the forces from wind and gravity do not cause buildings to shift or fail.",
      "Sports coaches use the second law to teach athletes how to maximize their power output by focusing on both force production and speed.",
      "The second law can be applied to individual particles in a fluid to model the flow of liquids and gases.",
      "It is also fundamental in thermodynamics for understanding the kinetic energy of molecules in a system.",
      "The second law is part of a larger framework of classical mechanics that has been used to build the modern industrial world.",
      "From the smallest gears in a watch to the largest turbines in a power plant, the second law dictates how machines operate.",
      "The law of motion is so reliable that it is used to precisely navigate spacecraft to distant planets and moons.",
      "It also helps us understand why heavier objects take longer to stop when moving at the same speed as lighter ones.",
      "The concept of impulse, which is force applied over a period of time, is directly derived from the second law.",
      "Impulse is critical in designing safety gear for sports and protective equipment for high-risk occupations.",
      "The second law is a bridge between the concept of force and the observable reality of motion.",
      "It teaches us that to change the world, we must apply a force, and the magnitude of that change depends on what we are moving.",
      "The mathematical beauty of the second law lies in its ability to describe complex phenomena with a single, clear relationship.",
      "Science students spend much of their early education mastering this law because it is the foundation for almost all physical science.",
      "Every mechanical invention in history has had to account for the second law to function correctly.",
      "It is a universal truth that applies to all objects in the universe, from microscopic cells to galactic clusters.",
      "The consistency of the second law allows scientists to conduct repeatable experiments and build reliable technology.",
      "It is a perfect example of how a simple observation can lead to a profound understanding of the universe."
    ],
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Newton%27s_second_law.svg/1200px-Newton%27s_second_law.svg.png"],
    suggestedVideos: [
      { title: "Newton's Second Law Explained", url: "https://www.youtube.com/embed/kKKM8Y-u7ds", thumbnail: "https://img.youtube.com/vi/kKKM8Y-u7ds/0.jpg" }
    ]
  },
  {
    keywords: ["photosynthesis"],
    topic: "Photosynthesis",
    summaryLines: [
      "Photosynthesis is the sophisticated biological process by which green plants, algae, and certain bacteria convert light energy into chemical energy.",
      "This process is essential for life on Earth as it is the primary source of organic material and oxygen in the atmosphere.",
      "The general chemical process of photosynthesis involves the conversion of carbon dioxide and water into glucose and oxygen using light energy.",
      "It primarily occurs in the chloroplasts, specialized organelles found in plant cells, particularly in the leaves.",
      "Chlorophyll is the green pigment within chloroplasts that captures the solar energy needed for the reaction.",
      "Photosynthesis consists of two main stages: the light-dependent reactions and the light-independent reactions.",
      "The light-dependent reactions take place in the thylakoid membranes of the chloroplasts, where solar energy is absorbed and converted into chemical energy carriers.",
      "During this first stage, water molecules are split, releasing oxygen as a byproduct.",
      "The oxygen produced is vital for the survival of aerobic organisms, including humans, who rely on it for cellular respiration.",
      "The light-independent reactions, also known as the carbon-fixing stage, occur in the stroma of the chloroplasts and do not directly require light.",
      "In this stage, the energy stored during the light-dependent reactions is used to fix carbon dioxide into a stable sugar, which is then converted into glucose.",
      "Glucose serves as a primary source of energy for the plant's growth, development, and reproduction.",
      "Plants also store excess glucose as starch in their roots, stems, and leaves for future use.",
      "Photosynthesis is influenced by several environmental factors, including light intensity, carbon dioxide concentration, and temperature.",
      "Increased light intensity typically increases the rate of photosynthesis until a saturation point is reached.",
      "Similarly, higher levels of carbon dioxide can enhance the process up to a certain limit.",
      "Temperature affects the enzymes involved in photosynthesis; if it is too high or too low, the process can slow down or stop entirely.",
      "Different plants have adapted different pathways to fix carbon, depending on their environment and adaptation to water availability.",
      "Most common plants fix carbon directly in the carbon-fixing cycle.",
      "Some specialized plants have evolved to minimize water loss in hot, dry climates by fixing carbon in two different cell types or during different times of day.",
      "Desert plants often fix carbon at night to conserve water in arid environments.",
      "Beyond providing food for the plant, photosynthesis is the foundation of almost all food chains on Earth.",
      "Herbivores eat plants to obtain energy, and carnivores eat herbivores, transferring the solar energy originally captured by plants through the ecosystem.",
      "This process also plays a crucial role in the global carbon cycle by removing carbon dioxide from the atmosphere, helping to regulate the Earth's climate.",
      "The reduction of carbon dioxide through photosynthesis helps mitigate the greenhouse effect and global warming.",
      "Forests, particularly tropical rainforests, are vital contributors to oxygen production and carbon sequestration.",
      "Marine phytoplankton also contribute significantly to global photosynthesis, producing about half of the world's oxygen.",
      "The evolution of photosynthesis billions of years ago drastically changed the Earth's atmosphere, leading to a rise in oxygen levels.",
      "This rise in atmospheric oxygen allowed for the development of more complex, multicellular life forms.",
      "In addition to food and oxygen, photosynthesis provides us with fossil fuels like coal, oil, and natural gas, which are the remains of ancient photosynthetic organisms.",
      "Modern agriculture relies on optimizing photosynthesis to increase crop yields and feed a growing global population.",
      "Researchers are currently exploring artificial photosynthesis to develop sustainable ways of producing clean energy and capturing carbon.",
      "Understanding photosynthesis is fundamental to fields such as botany, ecology, environmental science, and biochemistry.",
      "It illustrates the intricate and vital connection between the Sun, plants, and all other forms of life.",
      "Every breath we take and every meal we eat is a testament to the power of photosynthesis.",
      "The process of photosynthesis is a remarkable example of nature's efficiency in converting raw solar energy into usable chemical fuel.",
      "Without this process, the Earth's atmosphere would likely be filled with carbon dioxide, making it uninhabitable for most life forms.",
      "Photosynthesis is also involved in the creation of ozone in the upper atmosphere, which protects the Earth from harmful ultraviolet radiation.",
      "The pigments used in photosynthesis are tuned to capture the most abundant wavelengths of light from the Sun.",
      "While chlorophyll is the most well-known, other accessory pigments like carotenoids also help capture energy and protect the plant from damage.",
      "The structure of the leaf is specifically adapted to maximize light absorption and minimize water loss during photosynthesis.",
      "Stomata on the leaf surface allow for the exchange of gases like carbon dioxide and oxygen.",
      "The vascular system of the plant transports water to the leaves and glucose away from the leaves to other parts of the plant.",
      "Photosynthesis is one of the most studied and understood processes in biology, yet it still holds secrets that scientists are working to uncover.",
      "The efficiency of energy transfer in the thylakoid membrane is incredibly high, far exceeding that of modern solar panels.",
      "By studying the molecular details of photosynthesis, researchers hope to design better energy storage systems and more efficient crops.",
      "The process is a beautiful example of biochemical engineering that has stood the test of time.",
      "It is a universal process that connects all green life on Earth into a single energy-capturing network.",
      "The sustainability of our planet depends on the health of the photosynthetic organisms that maintain our atmosphere.",
      "Protecting forests and oceans is essential for ensuring that photosynthesis continues to balance the global climate.",
      "The discovery of how plants 'eat' light was a major breakthrough in our understanding of the natural world.",
      "It shifted our perspective from seeing plants as passive objects to recognizing them as active energy converters.",
      "Photosynthesis is the engine that drives the biological world, turning light into the building blocks of life.",
      "It is a process that is both ancient and ever-present, occurring in every green space on the planet.",
      "Every single molecule of oxygen in the air you are breathing right now was once part of a water molecule split by a plant.",
      "The complexity of the molecular machinery involved in photosynthesis is a marvel of the natural world.",
      "It is a reminder of the incredible ingenuity found in the evolution of life on Earth."
    ],
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Photosynthesis_equation.svg/1200px-Photosynthesis_equation.svg.png"],
    suggestedVideos: [
      { title: "Photosynthesis Explained", url: "https://www.youtube.com/embed/sQK3Yr4Sc_k", thumbnail: "https://img.youtube.com/vi/sQK3Yr4Sc_k/0.jpg" }
    ]
  },
  {
    keywords: ["alphabet", "alphabets", "letters", "abc"],
    topic: 'English Alphabet',
    summaryLines: [
      'The English alphabet has 26 letters.',
      'Uppercase: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z.',
      'Lowercase: a b c d e f g h i j k l m n o p q r s t u v w x y z.',
      'Vowels: A E I O U.',
      'Consonants: the remaining 21 letters.',
      'Letters combine to form syllables, words, and sentences.'
    ],
    imageUrls: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Alphabet_English.svg/1024px-Alphabet_English.svg.png'],
    aiVideoUrl: 'https://www.youtube.com/embed/hq3yfQnllfQ?vq=hd1080', // ABCD song
    suggestedVideos: [
      { title: 'ABCD Song for Kids', url: 'https://www.youtube.com/embed/hq3yfQnllfQ', thumbnail: 'https://img.youtube.com/vi/hq3yfQnllfQ/0.jpg' },
      { title: 'Learn the Alphabet', url: 'https://www.youtube.com/embed/kG3dH1Jas92', thumbnail: 'https://img.youtube.com/vi/kG3dH1Jas92/0.jpg' }
    ]
  },
  {
    keywords: ["water cycle", "hydrologic cycle"],
    topic: "Water Cycle",
    summaryLines: [
      "The water cycle is the continuous movement of water on, above, and below the surface of the Earth.",
      "This cycle is fundamental to sustaining life on our planet and is driven by energy from the Sun and the force of gravity.",
      "Water on Earth exists in three states: liquid, solid, and gas, and it constantly changes between these states as it moves through the cycle.",
      "Evaporation is the process by which liquid water from oceans, lakes, and rivers is heated by the Sun and turns into water vapor, rising into the atmosphere.",
      "Most of the water vapor in the atmosphere comes from the oceans, which cover the majority of the Earth's surface.",
      "Transpiration is another important source of atmospheric water vapor, where plants release water from their leaves through small pores.",
      "Together, evaporation and transpiration contribute to the total amount of water vapor in the air.",
      "Sublimation is the process where ice and snow turn directly into water vapor without melting first, occurring in very cold, dry conditions.",
      "Condensation happens when water vapor in the atmosphere cools and turns back into liquid water droplets, forming clouds and fog.",
      "This process occurs as air rises and cools, leading to the formation of various types of clouds depending on the altitude and temperature.",
      "Precipitation is the falling of water from the atmosphere back to the Earth's surface in the form of rain, snow, or other frozen forms.",
      "Once water reaches the surface, it can follow several paths, depending on the terrain and soil type.",
      "Surface runoff occurs when water flows over the ground into streams, rivers, and eventually the oceans.",
      "Infiltration is the process by which water soaks into the ground, replenishing the soil moisture and the groundwater supply.",
      "Groundwater is stored in underground layers of rock and sediment, providing a vital source of freshwater for many communities.",
      "Some water is also stored in glaciers and ice caps, where it may remain for thousands of years before re-entering the cycle.",
      "The water cycle is a closed system, meaning the total amount of water on Earth remains relatively constant, although its distribution changes over time.",
      "It plays a crucial role in regulating the Earth's climate by transporting heat from the equator toward the poles.",
      "The cycle also helps to purify water as it evaporates, leaving behind salts and other impurities.",
      "However, the water cycle can also transport pollutants, such as when acid rain forms or when runoff carries chemicals into waterways.",
      "Human activities are significantly impacting the water cycle through changes in land use and climate.",
      "Land clearing reduces transpiration and can lead to changes in local rainfall patterns and soil erosion.",
      "Building over surfaces increases runoff and decreases the amount of water soaking into the ground, leading to more frequent flooding.",
      "Climate change is altering the timing and intensity of rainfall, leading to more extreme weather events like droughts and heavy storms.",
      "Melting ice due to global warming is causing sea levels to rise, which can lead to coastal flooding and changes in freshwater sources.",
      "Understanding the water cycle is essential for water resource management, agriculture, and disaster preparedness.",
      "Scientists study the cycle to predict water availability and to design systems for flood control and irrigation.",
      "The water cycle is also connected to other global cycles, such as the carbon and nitrogen cycles.",
      "It illustrates the interconnectedness of the Earth's atmosphere, water bodies, land, and living things.",
      "Every drop of water we use today has been through the water cycle countless times over billions of years.",
      "The cycle has been ongoing since the early history of the Earth, shaping the landscape and making life possible.",
      "It is a testament to the dynamic and resilient nature of our planet's systems.",
      "Conserving water and protecting the water cycle is vital for the future of humanity and the health of the entire ecosystem.",
      "Education about the water cycle helps people appreciate the value of water and the importance of sustainable practices.",
      "The endless journey of water is one of the most remarkable and essential processes in the natural world.",
      "The water cycle is not just a scientific concept; it is a vital life-support system that every living thing depends on.",
      "The movement of water through the cycle helps to distribute nutrients and minerals across the globe.",
      "Ocean currents, which are part of the larger water cycle, act like a conveyor belt for heat, influencing weather patterns worldwide.",
      "The ability of water to absorb and store large amounts of heat makes it a powerful regulator of global temperature.",
      "In the mountains, the water cycle is responsible for the formation of glaciers that carve out valleys and shape the terrain.",
      "In the rainforests, the cycle is so intense that plants can create their own local weather patterns through transpiration.",
      "The water cycle is also the reason we have freshwater, as the process of evaporation is a natural distillation system.",
      "Without the constant recycling of water, the land would eventually become dry and barren.",
      "The cycle is a perfect example of nature's ability to reuse resources indefinitely.",
      "It is a process that has no beginning and no end, only a continuous flow of energy and matter.",
      "The study of the water cycle involves many different fields of science, from meteorology to geology to biology.",
      "It is a complex system with many variables, and our understanding of it is constantly evolving with new research.",
      "The use of satellites has allowed us to track the movement of water across the globe in unprecedented detail.",
      "This data is crucial for predicting how the water cycle will respond to a changing climate.",
      "Protecting the quality of our water is just as important as protecting the quantity.",
      "The water cycle reminds us that everything on Earth is connected, and our actions in one place can have effects far away.",
      "It is a beautiful and intricate system that we must respect and cherish for generations to come.",
      "The journey of a single water molecule can take it from the deepest ocean to the highest cloud and back again.",
      "This endless movement is the pulse of our planet, ensuring that life continues to thrive in every corner of the Earth."
    ],
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Water_cycle.png/1200px-Water_cycle.png"],
    suggestedVideos: [
      { title: "Water Cycle Explained", url: "https://www.youtube.com/embed/al-do-HGuIk", thumbnail: "https://img.youtube.com/vi/al-do-HGuIk/0.jpg" }
    ]
  },
  {
    keywords: ["mitosis", "cell division"],
    topic: "Mitosis",
    summaryLines: [
      "Mitosis is a fundamental cellular process whereby a single cell divides to produce two genetically identical daughter cells.",
      "It is essential for the growth, development, and tissue repair of multicellular organisms.",
      "Unlike other types of cell division that produce gametes with half the chromosome number, mitosis maintains the full set of chromosomes of the parent cell.",
      "The process is part of the cell cycle, which also includes a growth phase where the cell replicates its genetic material in preparation for division.",
      "Mitosis itself is divided into several distinct phases: prophase, metaphase, anaphase, and telophase.",
      "During prophase, the genetic material condenses into visible chromosomes, each consisting of two identical parts joined together.",
      "The nuclear envelope also begins to break down, and a specialized structure made of fibers starts to form between opposite poles of the cell.",
      "In metaphase, these fibers attach to the chromosomes and align them along the cell's equator.",
      "This precise alignment ensures that each daughter cell will receive an equal and complete set of genetic instructions.",
      "Anaphase begins when the chromosomes split apart and are pulled toward opposite poles by the shortening fibers.",
      "Once separated, each part is considered an individual chromosome.",
      "During telophase, the chromosomes reach the poles and begin to relax back into their original state.",
      "A new nuclear envelope forms around each set of chromosomes, resulting in two distinct nuclei within the single cell.",
      "The physical separation of the cytoplasm, which usually begins during the final stage, involves the cell pinching in two.",
      "This ensures that the contents of the cell are distributed between the two new daughter cells.",
      "The entire process of mitosis is highly regulated by various proteins and checkpoints to ensure accuracy and prevent errors.",
      "Malfunctions in the mitotic process can lead to genetic instability and are a major cause of health issues like uncontrolled cell growth.",
      "Health problems can occur when cells divide uncontrollably due to failures in the cell cycle's regulatory mechanisms.",
      "Mitosis is also the basis for asexual reproduction in many single-celled and some multicellular organisms.",
      "In humans, millions of cells undergo mitosis every second to replace old or damaged cells in tissues like the skin and intestinal lining.",
      "The speed of mitosis varies between different cell types; for example, skin cells divide frequently, while mature nerve cells rarely divide.",
      "Understanding mitosis is crucial for fields such as genetics, developmental biology, and medicine.",
      "Researchers study mitosis to develop new treatments that target the cell division process in diseased cells.",
      "Advances in imaging technology have allowed scientists to observe mitosis in real-time and in great detail.",
      "The discovery of how cells divide was a major milestone in biology, linking cell division to heredity and growth.",
      "Mitosis ensures that every cell in an organism's body has the same genetic blueprint, which is vital for proper function and coordination.",
      "It allows an organism to grow from a single fertilized egg into a complex being with trillions of specialized cells.",
      "Tissues such as the liver have a high regenerative capacity because their cells can readily undergo mitosis when needed.",
      "In contrast, tissues like heart muscle have a limited capacity for mitosis, making it difficult for those tissues to repair themselves after an injury.",
      "Stem cells are unique because they can both undergo mitosis to maintain their population and differentiate into various specialized cell types.",
      "The study of mitosis continues to reveal new insights into the fundamental nature of life and the mechanisms of health and disease.",
      "It is a beautiful and highly orchestrated process that makes complex life possible.",
      "Every multicellular organism on Earth depends on mitosis for its very existence.",
      "The precision of the chromosome separation during mitosis is one of the most accurate processes in nature.",
      "Even a single error in chromosome distribution can have profound effects on the resulting daughter cells.",
      "Mitosis is responsible for the rapid growth seen in embryos and during the healing of wounds.",
      "It is the mechanism by which your body constantly renews itself, replacing dead skin and blood cells.",
      "The study of mitosis has led to a deeper understanding of how aging occurs at a cellular level.",
      "Mitosis is a universal process found in all eukaryotic organisms, from single-celled yeast to giant redwood trees.",
      "It is a testament to the underlying unity of life that such a complex process is shared across so many different species.",
      "The fibers that move the chromosomes are made of proteins that are also used for other movements within the cell.",
      "The regulation of mitosis involves a series of 'stop' and 'go' signals that prevent the cell from dividing until everything is ready.",
      "These checkpoints check for DNA damage and ensure that all chromosomes are correctly attached to the fibers.",
      "Failure of these checkpoints can lead to the accumulation of mutations over time.",
      "Mitosis is a prime example of how life maintains order and consistency through generations of cells.",
      "It is a process that is both incredibly robust and delicately balanced.",
      "By understanding mitosis, we gain a window into the most basic functions of life itself.",
      "The complexity of the cellular machinery required for mitosis is a marvel of biological evolution.",
      "It is a process that is happening inside you right now, millions of times over, keeping you alive and healthy.",
      "Without mitosis, life as we know it would be impossible, and multicellular organisms would never have evolved.",
      "The continued study of mitosis is essential for the future of regenerative medicine and genetic research.",
      "It is one of the most fundamental concepts every biology student must master to understand how life works."
    ],
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Major_events_in_mitosis.svg/1200px-Major_events_in_mitosis.svg.png"],
    suggestedVideos: [
      { title: "Mitosis Explained", url: "https://www.youtube.com/embed/f-ldPgEfAHI", thumbnail: "https://img.youtube.com/vi/f-ldPgEfAHI/0.jpg" }
    ]
  },
  {
    keywords: ['quadratic equation', 'quadratic equations', 'quadratic'],
    topic: 'Quadratic Equations',
    summaryLines: [
      'A quadratic equation has the form ax² + bx + c = 0 with a ≠ 0.',
      'Its graph is a parabola opening upward when a > 0 and downward when a < 0.',
      'Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a.',
      'Discriminant Δ = b² - 4ac determines the nature of roots.',
      'Δ > 0 gives two distinct real roots, Δ = 0 one repeated root, Δ < 0 complex roots.',
      'Equations can be solved by factoring when the polynomial splits into linear factors.',
      'Completing the square rewrites ax² + bx + c into a(x + b/2a)² plus a constant.'
    ],
    imageUrls: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Quadratic_function.svg/1024px-Quadratic_function.svg.png'],
    aiVideoUrl: 'https://www.youtube.com/embed/VOaq87-q0lk?vq=hd1080', // explanatory video
    suggestedVideos: [
      { title: 'Quadratic Equations Explained', url: 'https://www.youtube.com/embed/VOaq87-q0lk', thumbnail: 'https://img.youtube.com/vi/VOaq87-q0lk/0.jpg' },
      { title: 'Solving Quadratic Equations', url: 'https://www.youtube.com/embed/xX_UX8b2LCE', thumbnail: 'https://img.youtube.com/vi/xX_UX8b2LCE/0.jpg' }
    ]
  },
  {
    keywords: ["kirchhoff's law", "kirchhoffs law", "kirchhoff law"],
    topic: "Kirchhoff's Law",
    summaryLines: [
      "Kirchhoff's laws are a set of two rules that deal with the conservation of charge and energy in electrical circuits.",
      "These laws are fundamental to circuit analysis and are used by engineers to design everything from simple flashlights to complex computer processors.",
      "Kirchhoff's Current Law (KCL), or the junction rule, states that the total current entering a junction or node in a circuit must equal the total current leaving that junction.",
      "This is a direct consequence of the conservation of electric charge, as charge cannot be created or destroyed at a point in the circuit.",
      "If five amperes of current flow into a junction, exactly five amperes must flow out through the various available paths.",
      "Kirchhoff's Voltage Law (KVL), or the loop rule, states that the directed sum of the potential differences (voltages) around any closed loop or mesh in a network is zero.",
      "This law is based on the principle of conservation of energy, implying that the total energy gained per unit charge is equal to the total energy lost per unit charge as it moves around a complete loop.",
      "In a simple loop with a battery and a resistor, the voltage supplied by the battery is exactly equal to the voltage dropped across the resistor.",
      "These laws allow us to set up systems of linear equations to solve for unknown currents and voltages in multi-loop circuits.",
      "When applying KCL, we define currents flowing into the node as positive and currents flowing out as negative (or vice versa), and their algebraic sum must be zero.",
      "For KVL, we choose a direction for the loop and assign signs to the voltage changes across components based on whether we are moving from high to low potential or low to high potential.",
      "Passive sign convention is typically used to ensure consistency when analyzing resistors, capacitors, and inductors.",
      "Kirchhoff's laws are applicable to both direct current (DC) and alternating current (AC) circuits, although AC analysis requires the use of complex numbers or phasors.",
      "These laws are valid for circuits where the time of travel of electromagnetic waves across the circuit is small compared to the time period of the signals (lumped-element model).",
      "In high-frequency circuits where this assumption fails, Maxwell's equations must be used for a more accurate analysis.",
      "The beauty of Kirchhoff's laws lies in their ability to simplify complex physical systems into manageable mathematical problems.",
      "They form the basis for nodal analysis and mesh analysis, two powerful techniques used in electronic design automation software.",
      "Every circuit designer must master these laws to ensure that power is distributed correctly and that sensitive components are not overloaded.",
      "Kirchhoff's laws also have analogies in other fields of science, such as fluid dynamics (conservation of flow) and thermal systems (conservation of heat).",
      "Understanding these laws provides a deep insight into the orderly nature of energy and matter in the universe.",
      "Without these principles, the rapid advancement of electrical engineering in the 20th and 21st centuries would have been impossible.",
      "They represent a perfect marriage of physical observation and mathematical rigor.",
      "The laws are a cornerstone of the secondary and tertiary physics curriculum worldwide.",
      "Mastery of circuit laws is essential for passing exams like NEET and JEE, which frequently feature complex circuit problems.",
      "In everyday life, these laws ensure that the electrical systems in our homes and vehicles operate safely and efficiently.",
      "For example, they explain how power is shared among different appliances plugged into a single parallel circuit.",
      "They also explain why a break in a series circuit stops all current flow, while a break in one branch of a parallel circuit does not.",
      "The study of these laws continues to be relevant as we develop new technologies like smart grids and renewable energy systems.",
      "Kirchhoff's laws remind us that the physical world follows predictable rules that we can understand and use to build a better future.",
      "The consistency and reliability of these laws are what make modern technology possible."
    ],
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Kirchhoff_Current_Law.svg/1200px-Kirchhoff_Current_Law.svg.png"],
    suggestedVideos: [
      { title: "Kirchhoff's Laws Explained", url: "https://www.youtube.com/embed/example", thumbnail: "https://img.youtube.com/vi/example/0.jpg" }
    ]
  },
  {
    keywords: ["projectile motion"],
    topic: "Projectile Motion",
    summaryLines: [
      "Projectile motion is a form of motion experienced by an object or particle that is thrown near the Earth's surface and moves along a curved path under the action of gravity only.",
      "This curved path is called a trajectory and is always in the shape of a parabola in the absence of air resistance.",
      "The motion is a result of two independent components: a constant horizontal velocity and a vertical motion with constant acceleration due to gravity.",
      "These two components act perpendicularly to each other and do not affect one another, which is a key principle of classical mechanics.",
      "The horizontal component of motion is characterized by zero acceleration, meaning the object covers equal horizontal distances in equal time intervals.",
      "The vertical component is influenced by the constant acceleration of gravity, which acts downward and causes the vertical velocity to change over time.",
      "At the peak of its trajectory, a projectile's vertical velocity is zero, while its horizontal velocity remains unchanged.",
      "The total time a projectile stays in the air is known as the 'time of flight' and depends only on its initial vertical velocity and the acceleration of gravity.",
      "The horizontal distance covered by the projectile during its time of flight is called the 'range'.",
      "The maximum height reached by the projectile is determined by its initial vertical velocity.",
      "Projectile motion calculations often assume that the Earth's surface is flat and that gravity is constant over the entire path.",
      "Air resistance, also known as drag, is often ignored in simple physics problems but is a significant factor in the real world, causing the trajectory to be shorter and less symmetric.",
      "The angle at which an object is launched significantly affects its range and maximum height.",
      "In the absence of air resistance, a launch angle of 45 degrees provides the maximum horizontal range for a given initial velocity.",
      "Complementary angles (e.g., 30 and 60 degrees) will result in the same range, although the maximum height and time of flight will differ.",
      "This concept is used extensively in sports, such as calculating the optimal angle for a basketball shot, a golf drive, or a javelin throw.",
      "In military applications, the principles of projectile motion are used to calculate the path of shells fired from artillery or the flight of missiles.",
      "Modern ballistics also accounts for factors like the Earth's curvature, the rotation of the Earth (Coriolis effect), and varying air density.",
      "Projectile motion is a standard topic in introductory physics because it perfectly illustrates the use of vectors and the independence of perpendicular motions.",
      "It teaches students how to break down complex 2D motion into simpler 1D problems that can be solved using kinematic equations.",
      "The study of projectiles has a long history, dating back to early investigations into the motion of falling bodies and the flight of arrows.",
      "Understanding these principles allowed for the development of more accurate clocks, navigation systems, and surveying tools.",
      "In space science, the concept of projectile motion is extended to understand the orbits of satellites, which are essentially projectiles moving so fast that they 'fall' around the curvature of the Earth.",
      "This led to the realization that orbital motion is just a special case of projectile motion.",
      "The equations used for projectiles are derived from the basic laws of motion and provide a high degree of predictive power.",
      "Students preparing for competitive exams like JEE and NEET must be proficient in solving projectile problems involving varying launch heights and moving targets.",
      "The beauty of projectile motion lies in its symmetry and the predictable nature of its path.",
      "It is a process that we observe every day, from a fountain's spray to a child throwing a ball in a park.",
      "Every time an object is launched into the air without its own power source, it follows the laws of projectile motion.",
      "These principles are a testament to the consistency of physical laws across different scales and environments."
    ],
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Projectile_motion_components.svg/1200px-Projectile_motion_components.svg.png"],
    suggestedVideos: [
      { title: "Projectile Motion Explained", url: "https://www.youtube.com/embed/example", thumbnail: "https://img.youtube.com/vi/example/0.jpg" }
    ]
  }
];

const getYouTubeSearchUrl = (query: string) => {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' educational explained')}`;
};

const getYouTubeEmbedUrl = (query: string) => {
  // Create a YouTube search embed URL
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query + ' educational tutorial')}`;
};

const getUnsplashImageUrls = (query: string) => {
  // Return high-quality, topic-specific images with proper resolution
  const topicImages: Record<string, string[]> = {
    'physics': [
      'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'chemistry': [
      'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'biology': [
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'mathematics': [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'computer': [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'history': [
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&h=1080&fit=crop&q=95&auto=format'
    ],
    'education': [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop&q=95&auto=format',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&h=1080&fit=crop&q=95&auto=format'
    ]
  };

  const lowerQuery = query.toLowerCase();
  for (const [key, images] of Object.entries(topicImages)) {
    if (lowerQuery.includes(key)) {
      return images;
    }
  }

  // Default educational images with high quality
  return [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop&q=95&auto=format',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&h=1080&fit=crop&q=95&auto=format'
  ];
};

const getBookRecommendations = (query: string): string[] => {
  const lowerQuery = query.toLowerCase();
  const bookMap: Record<string, string[]> = {
    'physics': ['"Concepts of Physics" by H.C. Verma', '"University Physics" by Young and Freedman', '"Fundamentals of Physics" by Halliday and Resnick'],
    'chemistry': ['"Organic Chemistry" by Morrison and Boyd', '"Inorganic Chemistry" by J.D. Lee', '"Physical Chemistry" by P.W. Atkins'],
    'biology': ['"Biology" by Campbell and Reece', '"Molecular Biology of the Gene" by Watson', '"Human Anatomy" by Netter'],
    'mathematics': ['"Calculus" by James Stewart', '"Linear Algebra and Its Applications" by Gilbert Strang', '"Discrete Mathematics" by Rosen'],
    'computer': ['"Introduction to Algorithms" by Cormen', '"Computer Networks" by Tanenbaum', '"Operating System Concepts" by Silberschatz'],
    'history': ['"A History of the World" by J.M. Roberts', '"The Guns of August" by Barbara Tuchman', '"Sapiens" by Yuval Noah Harari'],
    'economics': ['"Principles of Economics" by Mankiw', '"Macroeconomics" by Olivier Blanchard', '"Microeconomics" by Varian'],
    'psychology': ['"Psychology" by David Myers', '"Thinking, Fast and Slow" by Daniel Kahneman', '"The Man Who Mistook His Wife for a Hat" by Oliver Sacks'],
    'heart': ['"Cardiology" by Hurst', '"The Heart" by Fuster', '"Atlas of Heart Anatomy"'],
    'solar system': ['"Astronomy Today" by Chaisson and McMillan', '"An Introduction to the Solar System" by Woolfson', '"Cosmic Perspective" by Bennett'],
    'kidney': ['"Nephrology" by Brenner', '"Renal Pathology" by Jennette', '"Kidney Disease" by Taal'],
    'quadratic equation': ['"Algebra" by Artin', '"College Algebra" by Blitzer', '"Intermediate Algebra" by Martin-Gay'],
    'english alphabet': ['"English Grammar in Use" by Murphy', '"The Alphabet Book" for Kids', '"Phonics Pathways" by Hiskes']
  };

  for (const [key, books] of Object.entries(bookMap)) {
    if (lowerQuery.includes(key)) {
      return books;
    }
  }

  return ['"General Knowledge Encyclopedia"', '"Educational Reference Books"'];
};

const get3DModelUrl = (query: string): string | undefined => {
  const lowerQuery = query.toLowerCase();
  const modelMap: Record<string, string> = {
    'heart': 'https://sketchfab.com/models/4c7e6b4f0c0b4f9e9f0b4f9e9f0b4f9e/embed',
    'solar system': 'https://sketchfab.com/models/solar-system-3d-model/embed',
    'kidney': 'https://sketchfab.com/models/human-kidney-3d-model/embed',
    'brain': 'https://sketchfab.com/models/brain-anatomy-3d-model/embed',
    'dna': 'https://sketchfab.com/models/dna-helix-3d-model/embed',
    'atom': 'https://sketchfab.com/models/atomic-structure-3d-model/embed'
  };

  for (const [key, url] of Object.entries(modelMap)) {
    if (lowerQuery.includes(key)) {
      return url;
    }
  }

  return undefined;
};

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [userData, setUserData] = useState<any>(null);
  const [funzoneMood, setFunzoneMood] = useState<string>('happy');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [selectedExamPYQ, setSelectedExamPYQ] = useState<'KCET' | 'NEET' | 'JEE Main' | 'JEE Advanced'>('KCET');
  const [selectedSubjectPYQ, setSelectedSubjectPYQ] = useState<'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'>('Physics');

  const fetchLeaderboard = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const sorted = registeredUsers.sort((a: any, b: any) => (b.xp || 0) - (a.xp || 0));
    setLeaderboardData(sorted.slice(0, 3));
  };

  useEffect(() => {
    fetchLeaderboard();
    window.addEventListener('storage', fetchLeaderboard);
    window.addEventListener('leaderboardUpdate', fetchLeaderboard);
    return () => {
      window.removeEventListener('storage', fetchLeaderboard);
      window.removeEventListener('leaderboardUpdate', fetchLeaderboard);
    };
  }, []);

  const funTasks = useMemo(() => {
    if (!funzoneMood) return [];
    const tasks = {
      happy: ['Dance to your favorite song', 'Call a friend and share a joke', 'Watch a comedy show'],
      sad: ['Listen to uplifting music', 'Take a walk in nature', 'Write down three things you\'re grateful for'],
      confused: ['Take a deep breath and meditate for 5 minutes', 'Organize your thoughts in a journal', 'Talk to someone you trust'],
      bored: ['Try a new hobby', 'Read a book', 'Play a game'],
      tensed: ['Do some stretching exercises', 'Listen to calming music', 'Practice deep breathing']
    };
    return tasks[funzoneMood as keyof typeof tasks] || [];
  }, [funzoneMood]);

  const previousYearPapers: Record<
    'KCET' | 'NEET' | 'JEE Main' | 'JEE Advanced',
    Record<'Physics' | 'Chemistry' | 'Mathematics' | 'Biology', { year: string; label: string; url: string }[]>
  > = {
    KCET: {
      Physics: [
        {
          year: '2025',
          label: 'KCET 2025 Physics Question Paper',
          url: 'https://cetonline.karnataka.gov.in/kea/',
        },
        {
          year: '2024',
          label: 'KCET 2024 Physics Question Paper',
          url: 'https://cetonline.karnataka.gov.in/kea/',
        },
      ],
      Chemistry: [
        {
          year: '2025',
          label: 'KCET 2025 Chemistry Question Paper',
          url: 'https://cetonline.karnataka.gov.in/kea/',
        },
        {
          year: '2024',
          label: 'KCET 2024 Chemistry Question Paper',
          url: 'https://cetonline.karnataka.gov.in/kea/',
        },
      ],
      Mathematics: [
        {
          year: '2025',
          label: 'KCET 2025 Mathematics Question Paper',
          url: 'https://cetonline.karnataka.gov.in/kea/',
        },
        {
          year: '2024',
          label: 'KCET 2024 Mathematics Question Paper',
          url: 'https://cetonline.karnataka.gov.in/kea/',
        },
      ],
      Biology: [
        {
          year: '2025',
          label: 'KCET 2025 Biology Question Paper',
          url: 'https://cetonline.karnataka.gov.in/kea/',
        },
        {
          year: '2024',
          label: 'KCET 2024 Biology Question Paper',
          url: 'https://cetonline.karnataka.gov.in/kea/',
        },
      ],
    },
    NEET: {
      Physics: [
        {
          year: '2024',
          label: 'NEET 2024 Physics Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
        {
          year: '2023',
          label: 'NEET 2023 Physics Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
      ],
      Chemistry: [
        {
          year: '2024',
          label: 'NEET 2024 Chemistry Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
        {
          year: '2023',
          label: 'NEET 2023 Chemistry Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
      ],
      Mathematics: [],
      Biology: [
        {
          year: '2024',
          label: 'NEET 2024 Biology Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
        {
          year: '2023',
          label: 'NEET 2023 Biology Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
      ],
    },
    'JEE Main': {
      Physics: [
        {
          year: '2024',
          label: 'JEE Main 2024 January Physics Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
        {
          year: '2024',
          label: 'JEE Main 2024 April Physics Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
      ],
      Chemistry: [
        {
          year: '2024',
          label: 'JEE Main 2024 January Chemistry Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
        {
          year: '2024',
          label: 'JEE Main 2024 April Chemistry Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
      ],
      Mathematics: [
        {
          year: '2024',
          label: 'JEE Main 2024 January Mathematics Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
        {
          year: '2024',
          label: 'JEE Main 2024 April Mathematics Question Paper',
          url: 'https://nta.ac.in/Downloads',
        },
      ],
      Biology: [],
    },
    'JEE Advanced': {
      Physics: [
        {
          year: '2024',
          label: 'JEE Advanced 2024 Physics Paper 1',
          url: 'https://jeeadv.ac.in/archive.html',
        },
        {
          year: '2024',
          label: 'JEE Advanced 2024 Physics Paper 2',
          url: 'https://jeeadv.ac.in/archive.html',
        },
      ],
      Chemistry: [
        {
          year: '2024',
          label: 'JEE Advanced 2024 Chemistry Paper 1',
          url: 'https://jeeadv.ac.in/archive.html',
        },
        {
          year: '2024',
          label: 'JEE Advanced 2024 Chemistry Paper 2',
          url: 'https://jeeadv.ac.in/archive.html',
        },
      ],
      Mathematics: [
        {
          year: '2024',
          label: 'JEE Advanced 2024 Mathematics Paper 1',
          url: 'https://jeeadv.ac.in/archive.html',
        },
        {
          year: '2024',
          label: 'JEE Advanced 2024 Mathematics Paper 2',
          url: 'https://jeeadv.ac.in/archive.html',
        },
      ],
      Biology: [],
    },
  };

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const mockUser = userData
    ? {
      age: userData.age,
      class: userData.class || '10th',
      purpose: userData.purpose || 'KCET'
    }
    : {
      age: 15,
      class: '10th',
      purpose: 'KCET'
    };

  const allSuggestedContent = [
    {
      id: 1,
      title: 'Physics: Laws of Motion',
      category: 'Science',
      difficulty: 'Medium',
      description: "Master Newton's laws and their applications",
      summary:
        "Newton's laws of motion form the foundation of classical mechanics. The first law (Law of Inertia) states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. The second law (F=ma) quantitatively relates force, mass, and acceleration, showing that acceleration is directly proportional to net force and inversely proportional to mass. The third law states that for every action, there is an equal and opposite reaction. These laws explain everything from falling apples to rocket propulsion and are crucial for understanding mechanics in physics.",
      relevance: 'Essential for JEE preparation and NEET Physics'
    },
    {
      id: 2,
      title: 'Mathematics: Quadratic Equations',
      category: 'Math',
      difficulty: 'Medium',
      description: 'Learn to solve complex quadratic problems',
      summary:
        'Quadratic equations are polynomial equations of degree 2, typically written in the form ax² + bx + c = 0 where a ≠ 0. They can be solved using multiple methods: factoring (when the equation can be written as a product of linear factors), completing the square (rewriting the equation to isolate the square term), or the quadratic formula x = (-b ± √(b²-4ac)) / 2a. The discriminant D = b²-4ac determines the nature of roots: if D > 0, two distinct real roots; D = 0, one repeated real root; D < 0, two complex roots. Quadratic equations appear in physics, engineering, and real-world applications like projectile motion and optimization problems.',
      relevance: 'High weightage in competitive exams like JEE Main and Advanced'
    },
    {
      id: 3,
      title: 'Chemistry: Periodic Table',
      category: 'Science',
      difficulty: 'Easy',
      description: 'Understanding elements and their properties',
      summary:
        'The periodic table is a tabular arrangement of all known chemical elements, organized by increasing atomic number and grouped by similar chemical properties. Elements are arranged in periods (horizontal rows) and groups/families (vertical columns). Key trends include: atomic radius decreases across a period and increases down a group; electronegativity increases across periods and decreases down groups; ionization energy follows similar patterns. The periodic table helps predict element behavior, chemical bonding, and reactivity. Modern periodic table has 118 elements, with metals on the left, nonmetals on the right, and metalloids along the zigzag line.',
      relevance: 'Foundation for all chemistry concepts and essential for NEET preparation'
    },
    {
      id: 4,
      title: 'English: Grammar Essentials',
      category: 'Language',
      difficulty: 'Easy',
      description: 'Perfect your grammar for exams',
      summary:
        'Master essential grammar concepts including tenses, voice (active/passive), narration (direct/indirect speech), subject-verb agreement, articles, and prepositions. Understanding sentence structure and correct word usage improves both written and spoken communication.',
      relevance: 'Critical for language section in KCET and other exams'
    },
    {
      id: 6,
      title: 'Logical Reasoning: Patterns',
      category: 'Aptitude',
      difficulty: 'Medium',
      description: 'Develop analytical thinking skills',
      summary:
        'Logical reasoning involves identifying patterns, sequences, and relationships. Common types include number series, letter series, coding-decoding, blood relations, and syllogisms. Practice improves speed and accuracy in solving these problems systematically.',
      relevance: 'High scoring section in aptitude tests and KCET'
    },
    {
      id: 7,
      title: 'Biology: Cell Structure',
      category: 'Science',
      difficulty: 'Easy',
      description: 'Explore the building blocks of life',
      summary: 'Cells are the basic unit of life. Eukaryotic cells have a nucleus and organelles, while prokaryotic cells lack a nucleus. Understanding cell membrane, cytoplasm, and organelles is fundamental.',
      relevance: 'Core biology concept for NEET'
    },
    {
      id: 12,
      title: 'Physics for JEE',
      category: 'JEE Main',
      difficulty: 'Hard',
      description: 'Advanced physics concepts for JEE preparation',
      summary: 'Mechanics, thermodynamics, electromagnetism, optics, and modern physics with problem-solving techniques.',
      relevance: 'Critical for JEE Main and Advanced'
    },
    {
      id: 13,
      title: 'Chemistry for NEET',
      category: 'NEET',
      difficulty: 'Hard',
      description: 'Organic, inorganic, and physical chemistry',
      summary: 'Comprehensive coverage of chemical reactions, periodic table, biomolecules, and chemical equilibrium.',
      relevance: 'Essential for NEET preparation'
    },
    {
      id: 18,
      title: 'Aptitude for KCET',
      category: 'KCET',
      difficulty: 'Medium',
      description: 'Quantitative and logical reasoning',
      summary: 'Mathematics, physics, chemistry problems along with logical reasoning and English comprehension.',
      relevance: 'KCET entrance preparation'
    },
    {
      id: 20,
      title: 'Physics: Optics and Light',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Understanding light and optical phenomena',
      summary: 'Study of reflection, refraction, lenses, mirrors, and wave nature of light. Covers ray optics, wave optics, and applications in daily life.',
      relevance: 'Important for NEET and JEE Physics'
    },
    {
      id: 21,
      title: 'Mathematics: Trigonometry',
      category: 'Math',
      difficulty: 'Medium',
      description: 'Master angles and trigonometric functions',
      summary: 'Trigonometric ratios, identities, equations, and applications. Includes sine, cosine, tangent functions and their inverses.',
      relevance: 'Essential for JEE Main and Advanced'
    },
    {
      id: 22,
      title: 'Chemistry: Chemical Bonding',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Types of chemical bonds and their properties',
      summary: 'Ionic, covalent, and metallic bonding. Lewis structures, VSEPR theory, and molecular geometry explanations.',
      relevance: 'Foundation for understanding chemical reactions in NEET/JEE'
    },
    {
      id: 23,
      title: 'Biology: Human Physiology',
      category: 'Science',
      difficulty: 'Medium',
      description: 'Functioning of human body systems',
      summary: 'Digestive, respiratory, circulatory, nervous, and endocrine systems. Homeostasis and organ functions.',
      relevance: 'Core for NEET Biology'
    },
    {
      id: 41,
      title: 'Physics: Mechanics for JEE',
      category: 'JEE Advanced',
      difficulty: 'Hard',
      description: 'Advanced mechanics problems',
      summary: 'Kinematics, dynamics, work-energy, rotational mechanics with JEE-level problem solving.',
      relevance: 'Critical for JEE Advanced Physics'
    },
    {
      id: 42,
      title: 'Chemistry: Inorganic Chemistry for NEET',
      category: 'NEET',
      difficulty: 'Medium',
      description: 'Elements and their compounds',
      summary: 'Periodic properties, coordination compounds, metallurgy, and qualitative analysis.',
      relevance: 'NEET Chemistry syllabus'
    }
  ];

  const getCategoryStyle = (category: string): string => {
    const cat = category.toLowerCase();
    if (cat === 'science') return 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
    if (cat === 'math') return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    if (cat === 'language') return 'bg-teal-500/20 text-teal-300 border border-teal-500/30';
    if (cat === 'aptitude') return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
    if (cat === 'biology') return 'bg-green-500/20 text-green-300 border border-green-500/30';
    if (cat === 'physics') return 'bg-sky-500/20 text-sky-300 border border-sky-500/30';
    if (cat === 'chemistry') return 'bg-violet-500/20 text-violet-300 border border-violet-500/30';
    if (cat === 'kcet') return 'bg-pink-500/20 text-pink-300 border border-pink-500/30';
    if (cat === 'neet') return 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
    if (cat === 'jee main') return 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
    if (cat === 'jee advanced') return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
    return 'bg-primary/20 text-primary border border-primary/30';
  };

  const getDifficultyStyle = (difficulty: string): string => {
    const d = difficulty.toLowerCase();
    if (d === 'easy') return 'text-green-400';
    if (d === 'medium') return 'text-amber-400';
    if (d === 'hard') return 'text-red-400';
    return 'text-muted-foreground';
  };

  const getFilteredContent = () => {
    if (!userData?.purpose) return allSuggestedContent.slice(0, 6);
    const purpose = userData.purpose.toLowerCase();
    let filtered = allSuggestedContent.filter(content => {
      const cat = content.category.toLowerCase();
      const title = content.title.toLowerCase();

      // Match exactly with the purpose
      if (purpose === 'kcet') {
        return cat.includes('kcet') || ['science', 'math', 'aptitude', 'language'].includes(cat);
      }
      if (purpose === 'neet') {
        return cat.includes('neet') || ['science', 'biology', 'chemistry', 'physics'].includes(cat);
      }
      if (purpose === 'jee_mains') {
        return cat.includes('jee main') || ['science', 'math', 'physics', 'chemistry'].includes(cat);
      }
      if (purpose === 'jee_advanced') {
        return cat.includes('jee advanced') || ['science', 'math', 'physics', 'chemistry'].includes(cat);
      }

      return cat.includes(purpose) || title.includes(purpose) || purpose.includes(cat);
    });

    if (filtered.length < 6) {
      // Add more related topics if needed
      const additional = allSuggestedContent.filter(content =>
        !filtered.find(f => f.id === content.id)
      ).slice(0, 6 - filtered.length);
      filtered = [...filtered, ...additional];
    }
    return filtered.slice(0, 12); // Max 12 suggestions
  };

  const suggestedContent = useMemo(() => getFilteredContent(), [userData?.purpose]);

  // Render Dashboard



  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Navigation Bar */}
      <nav className="bg-card border-b border-primary/30 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Hi {userData?.name || 'User'}
          </div>
          <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
            Dashboard
          </Button>
        </div>
      </nav>

      <ParticleBackground />
      <div
        className="fixed top-[25%] right-[30%] w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.5) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
      />
      <div
        className="fixed bottom-[30%] left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div id="greeting" className="text-center text-lg font-semibold text-primary">
            Hi, {localStorage.getItem('username') || 'User'} 👋 Continue your learning!
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <DateTimeDisplay />
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="border-primary/30 hover:bg-primary/10"
              >
                {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                {theme === 'light' ? t('darkMode') : t('lightMode')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-400/60 hover:bg-amber-500/10 flex items-center gap-2 rounded-full cursor-pointer"
                onClick={() => setShowLeaderboard(true)}
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-semibold tracking-wide">Leaderboard</span>
              </Button>
              <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                <SelectTrigger className="w-32 border-primary/30">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="kn">{t('kannada')}</SelectItem>
                  <SelectItem value="hi">{t('hindi')}</SelectItem>
                  <SelectItem value="ta">{t('tamil')}</SelectItem>
                  <SelectItem value="te">{t('telugu')}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={funzoneMood} onValueChange={setFunzoneMood}>
                <SelectTrigger className="w-40 border-primary/30">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('funzone')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">{t('happy')}</SelectItem>
                  <SelectItem value="sad">{t('sad')}</SelectItem>
                  <SelectItem value="confused">{t('confused')}</SelectItem>
                  <SelectItem value="bored">{t('bored')}</SelectItem>
                  <SelectItem value="tensed">{t('tensed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* ── Learning Dashboard Hero ── */}
          <div className="text-center space-y-3">
            <h1
              className="text-5xl md:text-7xl font-extrabold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #ff1b8d 0%, #ff6ec7 50%, #c040fb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 24px rgba(255,27,141,0.55))',
              }}
            >
              {t('dashboardTitle')}
            </h1>
            <p className="text-muted-foreground flex items-center justify-center gap-2 text-base">
              {t('dashboardSubtitle')}
              <span
                className="inline-block w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: '#00d9ff', boxShadow: '0 0 8px 3px rgba(0,217,255,0.7)' }}
              />
            </p>
          </div>

          {/* Newspaper and Current Affairs Section */}
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8">
              <NewspaperSection />
              <CurrentAffairsPanel />
            </div>
          </div>

          <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
            <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border border-amber-500/30 glow-orange rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Leaderboard</h2>
                  <p className="text-sm text-muted-foreground">Top 3 Students</p>
                </div>
              </div>

              <div className="space-y-4">
                {leaderboardData.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No students registered yet.
                  </div>
                ) : (
                  leaderboardData.map((user, index) => (
                    <div
                      key={user.email}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                          ${index === 0 ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-110' :
                            index === 1 ? 'bg-gray-300 text-black' :
                              index === 2 ? 'bg-amber-700 text-white' : 'bg-primary/20 text-primary'}`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-lg">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.school || 'Student'}</p>
                        </div>
                      </div>
                      <div className="font-bold text-xl text-primary drop-shadow-md">
                        {user.xp || 0} XP
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 text-center text-xs text-muted-foreground">
                <p>Updates in real-time across all active sessions.</p>
                <Link to="/quiz" onClick={() => setShowLeaderboard(false)}>
                  <Button variant="link" className="text-primary mt-2">Go to Quiz Arena to earn XP &rarr;</Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-primary/30 p-6 hover:border-primary transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-pink">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{t('text')}</h3>
                <p className="text-sm text-muted-foreground">{t('textDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-secondary/30 p-6 hover:border-secondary transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center glow-blue">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-foreground">{t('textbook')}</h3>
                <p className="text-sm text-muted-foreground">{t('textbookDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-accent/30 p-6 hover:border-accent transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center glow-cyan">
                  <Box className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground">{t('threeDView')}</h3>
                <p className="text-sm text-muted-foreground">{t('threeDViewDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card border border-accent/30 p-6 hover:border-accent transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center glow-green">
                  <Video className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground">{t('video')}</h3>
                <p className="text-sm text-muted-foreground">{t('videoDesc')}</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-primary/30 p-6 hover:border-primary transition-all hover:scale-105 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-pink">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{t('images')}</h3>
                <p className="text-sm text-muted-foreground">{t('imagesDesc')}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold gradient-text">{t('personalizedTitle')}</h2>
              <p className="text-muted-foreground">
                Choose your exam, subject &amp; mode — then get content, MCQs, mock tests &amp; revision
              </p>
            </div>
            {/* PCMB Tutor embedded wizard */}
            <TutorWidget />

            {/* Multi Mode Tutor Selection Flow */}
            <div className="pt-4">
              <MultiModeTutor />
            </div>

            <div className="text-center space-y-4 pt-8">
              <h3 className="text-2xl font-bold gradient-text">Quick Actions</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/games">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all rounded-xl">
                    <Gamepad2 className="mr-2" />
                    Play Games
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all">
                    <Sparkles className="mr-2" />
                    Take Quiz
                  </Button>
                </Link>
                <Link to="/rooms">
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all">
                    <BookOpen className="mr-2" />
                    Study Rooms
                  </Button>
                </Link>
                <Link to="/tutor">
                  <Button variant="outline" className="border-accent/40 hover:bg-accent/10 hover:scale-105 transition-all">
                    <GraduationCap className="mr-2" />
                    PCMB Tutor
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-10 space-y-4">
              <div className="text-center space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
                  <h3 className="text-2xl font-bold gradient-text">Previous Year Question Papers</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:bg-primary/10"
                    onClick={() => window.open('http://localhost:8000/pyq.html', '_blank')}
                  >
                    Open Early Links
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Practice official KCET, NEET, JEE Main &amp; JEE Advanced papers.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {(['KCET', 'NEET', 'JEE Main', 'JEE Advanced'] as const).map((exam) => (
                  <Button
                    key={exam}
                    variant={selectedExamPYQ === exam ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedExamPYQ(exam)}
                    className={
                      selectedExamPYQ === exam
                        ? 'rounded-full px-4 bg-gradient-to-r from-primary to-accent'
                        : 'rounded-full border-primary/30'
                    }
                  >
                    {exam}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {(['Physics', 'Chemistry', 'Mathematics', 'Biology'] as const).map((subject) => (
                  <Button
                    key={subject}
                    variant={selectedSubjectPYQ === subject ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSubjectPYQ(subject)}
                    className={
                      selectedSubjectPYQ === subject
                        ? 'rounded-full px-4 bg-primary'
                        : 'rounded-full border-primary/30'
                    }
                  >
                    {subject}
                  </Button>
                ))}
              </div>
              <div className="rounded-3xl bg-card border border-primary/30 p-6 glow-pink max-w-3xl mx-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      {selectedExamPYQ} • {selectedSubjectPYQ}
                    </span>
                    {selectedExamPYQ !== 'KCET' && (
                      <span className="text-xs text-muted-foreground">
                        Papers for this exam coming soon.
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2 text-sm">
                    {previousYearPapers[selectedExamPYQ][selectedSubjectPYQ].length === 0 ? (
                      <li className="text-muted-foreground">
                        No papers added yet. Please check back later.
                      </li>
                    ) : (
                      previousYearPapers[selectedExamPYQ][selectedSubjectPYQ].map((paper) => (
                        <li key={`${paper.year}-${paper.label}`}>
                          <a
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {paper.year} – {paper.label}
                          </a>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {funTasks.length > 0 && (
              <div className="relative overflow-hidden rounded-3xl bg-card border border-accent/30 p-6 glow-purple">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                <div className="relative space-y-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                    Funzone - {t(funzoneMood)}
                  </span>
                  <h2 className="text-2xl font-bold gradient-text">Fun Tasks</h2>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {funTasks.map((task, index) => (
                      <li key={`fun-${index}`}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Road Map Section */}
          <div className="max-w-6xl mx-auto w-full">
            <RoadMapSection />
          </div>

          {/* Application Owner Section */}
          <div className="max-w-6xl mx-auto w-full mt-8">
            <div className="rounded-3xl bg-card border border-primary/30 p-6 glow-pink">
              <h2 className="text-2xl font-bold gradient-text mb-4">Application Owner</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Original Owner:</strong> John Doe</p>
                <p><strong>Application Name:</strong> Lumina AI Quest</p>
                <p><strong>Version:</strong> 1.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Dashboard;
