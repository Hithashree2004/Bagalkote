import { useState, useEffect, useRef } from 'react';
import { Trophy, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import { toast } from 'sonner';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
  category: string;
};

const questionPools: Record<string, Record<string, Question[]>> = {
  '1st': {
    'regular study': [
      { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 'Easy', category: 'Math' },
      { question: 'What color is the sky?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Blue', difficulty: 'Easy', category: 'Science' },
      { question: 'How many legs does a cat have?', options: ['2', '4', '6', '8'], correctAnswer: '4', difficulty: 'Easy', category: 'Science' },
      { question: 'What is the first letter of the alphabet?', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A', difficulty: 'Easy', category: 'Language' },
      { question: 'What is 1 + 1?', options: ['1', '2', '3', '4'], correctAnswer: '2', difficulty: 'Easy', category: 'Math' },
      { question: 'What color is grass?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Green', difficulty: 'Easy', category: 'Science' },
      { question: 'How many fingers do you have on one hand?', options: ['3', '4', '5', '6'], correctAnswer: '5', difficulty: 'Easy', category: 'Science' },
      { question: 'What is the color of the sun?', options: ['Blue', 'Red', 'Yellow', 'Green'], correctAnswer: 'Yellow', difficulty: 'Easy', category: 'Science' },
      { question: 'What is 3 + 1?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 'Easy', category: 'Math' },
      { question: 'What animal says "meow"?', options: ['Dog', 'Cat', 'Cow', 'Duck'], correctAnswer: 'Cat', difficulty: 'Easy', category: 'Science' },
      { question: 'What is 4 - 2?', options: ['1', '2', '3', '4'], correctAnswer: '2', difficulty: 'Easy', category: 'Math' },
      { question: 'What do cows drink?', options: ['Milk', 'Water', 'Juice', 'Soda'], correctAnswer: 'Water', difficulty: 'Easy', category: 'Science' },
      { question: 'What is the last letter of the alphabet?', options: ['X', 'Y', 'Z', 'W'], correctAnswer: 'Z', difficulty: 'Easy', category: 'Language' },
      { question: 'How many wheels does a bicycle have?', options: ['1', '2', '3', '4'], correctAnswer: '2', difficulty: 'Easy', category: 'Science' },
      { question: 'What is 5 - 1?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 'Easy', category: 'Math' },
    ],
  },
  '2nd': {
    'regular study': [
      { question: 'What is 5 + 3?', options: ['6', '7', '8', '9'], correctAnswer: '8', difficulty: 'Easy', category: 'Math' },
      { question: 'What do bees make?', options: ['Milk', 'Honey', 'Bread', 'Cheese'], correctAnswer: 'Honey', difficulty: 'Easy', category: 'Science' },
      { question: 'How many days are in a week?', options: ['5', '6', '7', '8'], correctAnswer: '7', difficulty: 'Easy', category: 'General' },
      { question: 'What is 6 + 2?', options: ['7', '8', '9', '10'], correctAnswer: '8', difficulty: 'Easy', category: 'Math' },
      { question: 'What color is the ocean?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Blue', difficulty: 'Easy', category: 'Science' },
      { question: 'How many hours are in a day?', options: ['20', '22', '24', '26'], correctAnswer: '24', difficulty: 'Easy', category: 'General' },
      { question: 'What is 7 - 3?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 'Easy', category: 'Math' },
      { question: 'What do chickens lay?', options: ['Milk', 'Eggs', 'Honey', 'Bread'], correctAnswer: 'Eggs', difficulty: 'Easy', category: 'Science' },
      { question: 'What is the color of blood?', options: ['Blue', 'Red', 'Green', 'Yellow'], correctAnswer: 'Red', difficulty: 'Easy', category: 'Science' },
      { question: 'How many months are in a year?', options: ['10', '11', '12', '13'], correctAnswer: '12', difficulty: 'Easy', category: 'General' },
      { question: 'What is 9 + 1?', options: ['9', '10', '11', '12'], correctAnswer: '10', difficulty: 'Easy', category: 'Math' },
      { question: 'What do trees produce?', options: ['Milk', 'Honey', 'Fruit', 'Meat'], correctAnswer: 'Fruit', difficulty: 'Easy', category: 'Science' },
      { question: 'What is 8 - 4?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 'Easy', category: 'Math' },
      { question: 'What animal is known as "man\'s best friend"?', options: ['Cat', 'Dog', 'Cow', 'Horse'], correctAnswer: 'Dog', difficulty: 'Easy', category: 'Science' },
      { question: 'How many continents are there?', options: ['5', '6', '7', '8'], correctAnswer: '7', difficulty: 'Easy', category: 'Geography' },
    ],
  },
  '3rd': {
    'regular study': [
      { question: 'What is 10 - 4?', options: ['5', '6', '7', '8'], correctAnswer: '6', difficulty: 'Easy', category: 'Math' },
      { question: 'What is the largest planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Jupiter', difficulty: 'Medium', category: 'Science' },
      { question: 'What is 12 + 3?', options: ['14', '15', '16', '17'], correctAnswer: '15', difficulty: 'Easy', category: 'Math' },
      { question: 'What do plants need to grow?', options: ['Air', 'Water', 'Sunlight', 'All of these'], correctAnswer: 'All of these', difficulty: 'Easy', category: 'Science' },
      { question: 'What is 15 - 7?', options: ['7', '8', '9', '10'], correctAnswer: '8', difficulty: 'Easy', category: 'Math' },
      { question: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], correctAnswer: 'Delhi', difficulty: 'Easy', category: 'Geography' },
      { question: 'What is 20 ÷ 4?', options: ['4', '5', '6', '7'], correctAnswer: '5', difficulty: 'Easy', category: 'Math' },
      { question: 'What is the boiling point of water?', options: ['90°C', '100°C', '110°C', '120°C'], correctAnswer: '100°C', difficulty: 'Medium', category: 'Science' },
      { question: 'What is 18 - 9?', options: ['8', '9', '10', '11'], correctAnswer: '9', difficulty: 'Easy', category: 'Math' },
      { question: 'What do caterpillars turn into?', options: ['Butterflies', 'Bees', 'Birds', 'Fish'], correctAnswer: 'Butterflies', difficulty: 'Easy', category: 'Science' },
      { question: 'What is 25 + 5?', options: ['25', '30', '35', '40'], correctAnswer: '30', difficulty: 'Easy', category: 'Math' },
      { question: 'What is the largest animal?', options: ['Elephant', 'Whale', 'Lion', 'Tiger'], correctAnswer: 'Whale', difficulty: 'Medium', category: 'Science' },
      { question: 'What is 30 - 12?', options: ['16', '17', '18', '19'], correctAnswer: '18', difficulty: 'Easy', category: 'Math' },
      { question: 'What do we call a baby dog?', options: ['Puppy', 'Kitten', 'Calf', 'Foal'], correctAnswer: 'Puppy', difficulty: 'Easy', category: 'Science' },
      { question: 'How many sides does a triangle have?', options: ['2', '3', '4', '5'], correctAnswer: '3', difficulty: 'Easy', category: 'Math' },
    ],
  },
  '10th': {
    'regular study': [
      { question: 'What is the square root of 16?', options: ['2', '4', '6', '8'], correctAnswer: '4', difficulty: 'Easy', category: 'Math' },
      { question: 'Who wrote Romeo and Juliet?', options: ['Shakespeare', 'Dickens', 'Hemingway', 'Twain'], correctAnswer: 'Shakespeare', difficulty: 'Medium', category: 'Literature' },
      { question: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correctAnswer: 'Au', difficulty: 'Medium', category: 'Chemistry' },
      { question: 'What is the area of a circle with radius 7?', options: ['49π', '14π', '21π', '28π'], correctAnswer: '49π', difficulty: 'Medium', category: 'Math' },
      { question: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Michelangelo'], correctAnswer: 'Da Vinci', difficulty: 'Medium', category: 'Art' },
      { question: 'What is the speed of light?', options: ['3×10^8 m/s', '3×10^6 m/s', '3×10^10 m/s', '3×10^4 m/s'], correctAnswer: '3×10^8 m/s', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Rome'], correctAnswer: 'Paris', difficulty: 'Easy', category: 'Geography' },
      { question: 'What is 2^5?', options: ['16', '32', '64', '128'], correctAnswer: '32', difficulty: 'Easy', category: 'Math' },
      { question: 'Who discovered penicillin?', options: ['Fleming', 'Pasteur', 'Darwin', 'Mendel'], correctAnswer: 'Fleming', difficulty: 'Medium', category: 'Science' },
      { question: 'What is the derivative of x^2?', options: ['x', '2x', 'x^2', '2'], correctAnswer: '2x', difficulty: 'Medium', category: 'Math' },
      { question: 'What is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 'Pacific', difficulty: 'Easy', category: 'Geography' },
      { question: 'What is the atomic number of carbon?', options: ['4', '6', '8', '12'], correctAnswer: '6', difficulty: 'Medium', category: 'Chemistry' },
      { question: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'J.K. Rowling', 'Mark Twain', 'Ernest Hemingway'], correctAnswer: 'Harper Lee', difficulty: 'Medium', category: 'Literature' },
      { question: 'What is the Pythagorean theorem?', options: ['a^2 + b^2 = c^2', 'a^2 - b^2 = c^2', 'a + b = c', 'a × b = c'], correctAnswer: 'a^2 + b^2 = c^2', difficulty: 'Medium', category: 'Math' },
      { question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], correctAnswer: 'Tokyo', difficulty: 'Easy', category: 'Geography' },
    ],
    'jee': [
      { question: 'What is the acceleration due to gravity?', options: ['8.9 m/s²', '9.8 m/s²', '10.2 m/s²', '7.5 m/s²'], correctAnswer: '9.8 m/s²', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the chemical formula for water?', options: ['H2O', 'CO2', 'O2', 'H2O2'], correctAnswer: 'H2O', difficulty: 'Easy', category: 'Chemistry' },
      { question: 'What is the value of Planck\'s constant?', options: ['6.626×10^-34 J s', '1.602×10^-19 C', '9.109×10^-31 kg', '1.381×10^-23 J/K'], correctAnswer: '6.626×10^-34 J s', difficulty: 'Hard', category: 'Physics' },
      { question: 'What is the oxidation state of Fe in Fe2O3?', options: ['+2', '+3', '+4', '+6'], correctAnswer: '+3', difficulty: 'Medium', category: 'Chemistry' },
      { question: 'What is the integral of 1/x dx?', options: ['x', 'ln|x|', 'e^x', 'x^2'], correctAnswer: 'ln|x|', difficulty: 'Medium', category: 'Math' },
      { question: 'What is the wavelength of light with frequency 5×10^14 Hz?', options: ['4×10^-7 m', '5×10^-7 m', '6×10^-7 m', '7×10^-7 m'], correctAnswer: '6×10^-7 m', difficulty: 'Hard', category: 'Physics' },
      { question: 'What is the hybridization of carbon in CH4?', options: ['sp', 'sp2', 'sp3', 'dsp2'], correctAnswer: 'sp3', difficulty: 'Medium', category: 'Chemistry' },
      { question: 'What is the limit of (1 - cos x)/x as x approaches 0?', options: ['0', '1', '∞', 'undefined'], correctAnswer: '0', difficulty: 'Medium', category: 'Math' },
      { question: 'What is the energy of a photon with wavelength 400 nm?', options: ['3.1 eV', '4.1 eV', '5.1 eV', '6.1 eV'], correctAnswer: '3.1 eV', difficulty: 'Hard', category: 'Physics' },
      { question: 'What is the pKa of acetic acid?', options: ['3.76', '4.76', '5.76', '6.76'], correctAnswer: '4.76', difficulty: 'Medium', category: 'Chemistry' },
      { question: 'What is the derivative of sin x?', options: ['cos x', '-sin x', 'tan x', 'sec x'], correctAnswer: 'cos x', difficulty: 'Easy', category: 'Math' },
      { question: 'What is the magnetic quantum number for l=2?', options: ['-2 to +2', '-1 to +1', '0 to 2', '-3 to +3'], correctAnswer: '-2 to +2', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the molecular weight of NaCl?', options: ['58.44', '74.55', '84.01', '98.08'], correctAnswer: '58.44', difficulty: 'Easy', category: 'Chemistry' },
      { question: 'What is the area under the curve y = x^2 from 0 to 1?', options: ['1/2', '1/3', '1/4', '1'], correctAnswer: '1/3', difficulty: 'Medium', category: 'Math' },
      { question: 'What is the critical angle for glass-air interface?', options: ['24°', '42°', '48°', '60°'], correctAnswer: '42°', difficulty: 'Medium', category: 'Physics' },
    ],
    'neet': [
      { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'], correctAnswer: 'Mitochondria', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the function of hemoglobin?', options: ['Transport oxygen', 'Digest food', 'Fight infection', 'Produce energy'], correctAnswer: 'Transport oxygen', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the pH of blood?', options: ['6.8-7.0', '7.35-7.45', '8.0-8.5', '4.5-5.5'], correctAnswer: '7.35-7.45', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the genetic material in cells?', options: ['Protein', 'Carbohydrate', 'DNA', 'Lipid'], correctAnswer: 'DNA', difficulty: 'Easy', category: 'Biology' },
      { question: 'What is the largest organ in the human body?', options: ['Heart', 'Liver', 'Skin', 'Brain'], correctAnswer: 'Skin', difficulty: 'Easy', category: 'Biology' },
      { question: 'What is the process of cell division in somatic cells?', options: ['Meiosis', 'Mitosis', 'Binary fission', 'Budding'], correctAnswer: 'Mitosis', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the function of the kidney?', options: ['Pump blood', 'Filter blood', 'Produce insulin', 'Digest food'], correctAnswer: 'Filter blood', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the basic unit of life?', options: ['Atom', 'Molecule', 'Cell', 'Tissue'], correctAnswer: 'Cell', difficulty: 'Easy', category: 'Biology' },
      { question: 'What is the role of chlorophyll in plants?', options: ['Absorb light', 'Store water', 'Provide support', 'Transport nutrients'], correctAnswer: 'Absorb light', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the number of chromosomes in human cells?', options: ['23', '46', '92', '138'], correctAnswer: '46', difficulty: 'Easy', category: 'Biology' },
      { question: 'What is the process by which plants make food?', options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Translocation'], correctAnswer: 'Photosynthesis', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the function of the heart?', options: ['Pump blood', 'Filter waste', 'Produce hormones', 'Store nutrients'], correctAnswer: 'Pump blood', difficulty: 'Easy', category: 'Biology' },
      { question: 'What is the study of heredity?', options: ['Genetics', 'Ecology', 'Anatomy', 'Physiology'], correctAnswer: 'Genetics', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the largest bone in the human body?', options: ['Femur', 'Tibia', 'Humerus', 'Radius'], correctAnswer: 'Femur', difficulty: 'Easy', category: 'Biology' },
      { question: 'What is the function of white blood cells?', options: ['Carry oxygen', 'Fight infection', 'Clot blood', 'Transport nutrients'], correctAnswer: 'Fight infection', difficulty: 'Medium', category: 'Biology' },
    ],
  },
  '12th': {
    'engineering': [
      { question: 'What is Ohm\'s law?', options: ['V=IR', 'F=ma', 'E=mc²', 'PV=nRT'], correctAnswer: 'V=IR', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the efficiency of a Carnot engine?', options: ['1 - T2/T1', 'T1/T2', 'T2/T1', '1 - T1/T2'], correctAnswer: '1 - T2/T1', difficulty: 'Hard', category: 'Physics' },
      { question: 'What is the modulus of elasticity?', options: ['Stress/Strain', 'Force/Area', 'Mass/Volume', 'Energy/Time'], correctAnswer: 'Stress/Strain', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the chemical formula for benzene?', options: ['C6H6', 'C6H12', 'C6H14', 'C6H8'], correctAnswer: 'C6H6', difficulty: 'Easy', category: 'Chemistry' },
      { question: 'What is the derivative of e^x?', options: ['e^x', 'ln x', '1/x', 'x'], correctAnswer: 'e^x', difficulty: 'Easy', category: 'Math' },
      { question: 'What is the unit of magnetic flux?', options: ['Tesla', 'Weber', 'Henry', 'Farad'], correctAnswer: 'Weber', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the pH of a neutral solution?', options: ['0', '7', '14', '1'], correctAnswer: '7', difficulty: 'Easy', category: 'Chemistry' },
      { question: 'What is the integral of dx/x?', options: ['x', 'ln|x|', 'e^x', 'sin x'], correctAnswer: 'ln|x|', difficulty: 'Medium', category: 'Math' },
      { question: 'What is the speed of sound in air?', options: ['330 m/s', '340 m/s', '350 m/s', '360 m/s'], correctAnswer: '340 m/s', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the molecular weight of CO2?', options: ['28', '32', '44', '48'], correctAnswer: '44', difficulty: 'Easy', category: 'Chemistry' },
      { question: 'What is the limit of sin x / x as x approaches 0?', options: ['0', '1', '∞', 'undefined'], correctAnswer: '1', difficulty: 'Medium', category: 'Math' },
      { question: 'What is the principle of superposition?', options: ['Forces add up', 'Waves interfere', 'Energy conserves', 'Momentum conserves'], correctAnswer: 'Waves interfere', difficulty: 'Medium', category: 'Physics' },
      { question: 'What is the oxidation number of S in H2SO4?', options: ['+2', '+4', '+6', '+8'], correctAnswer: '+6', difficulty: 'Medium', category: 'Chemistry' },
      { question: 'What is the area of convergence of ∫ dx/(x^2+1)?', options: ['π/2', 'π', '2π', 'π/4'], correctAnswer: 'π/2', difficulty: 'Hard', category: 'Math' },
      { question: 'What is the resistivity of copper?', options: ['1.7×10^-8 Ωm', '2.8×10^-8 Ωm', '5.8×10^-8 Ωm', '9.8×10^-8 Ωm'], correctAnswer: '1.7×10^-8 Ωm', difficulty: 'Medium', category: 'Physics' },
    ],
    'medical': [
      { question: 'What is the normal pH of blood?', options: ['6.5', '7.0', '7.35', '8.0'], correctAnswer: '7.35', difficulty: 'Hard', category: 'Biology' },
      { question: 'What is the function of the pancreas?', options: ['Produce insulin', 'Filter blood', 'Pump blood', 'Absorb nutrients'], correctAnswer: 'Produce insulin', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the structure of DNA?', options: ['Single helix', 'Double helix', 'Triple helix', 'Quadruple helix'], correctAnswer: 'Double helix', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the normal body temperature?', options: ['35°C', '36°C', '37°C', '38°C'], correctAnswer: '37°C', difficulty: 'Easy', category: 'Biology' },
      { question: 'What is the role of enzymes?', options: ['Catalyze reactions', 'Store energy', 'Carry oxygen', 'Fight infection'], correctAnswer: 'Catalyze reactions', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the largest artery in the body?', options: ['Aorta', 'Pulmonary', 'Carotid', 'Femoral'], correctAnswer: 'Aorta', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the process of fertilization?', options: ['Fusion of gametes', 'Cell division', 'Protein synthesis', 'DNA replication'], correctAnswer: 'Fusion of gametes', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the function of the spleen?', options: ['Store blood', 'Produce bile', 'Filter lymph', 'Secrete hormones'], correctAnswer: 'Filter lymph', difficulty: 'Hard', category: 'Biology' },
      { question: 'What is the number of cranial nerves?', options: ['10', '12', '14', '16'], correctAnswer: '12', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the cause of sickle cell anemia?', options: ['Mutation in hemoglobin', 'Vitamin deficiency', 'Bacterial infection', 'Viral infection'], correctAnswer: 'Mutation in hemoglobin', difficulty: 'Hard', category: 'Biology' },
      { question: 'What is the function of the thyroid gland?', options: ['Regulate metabolism', 'Produce insulin', 'Filter blood', 'Absorb nutrients'], correctAnswer: 'Regulate metabolism', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the process of osmosis?', options: ['Movement of water', 'Movement of ions', 'Diffusion of gases', 'Active transport'], correctAnswer: 'Movement of water', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the largest muscle in the body?', options: ['Biceps', 'Triceps', 'Gluteus maximus', 'Quadriceps'], correctAnswer: 'Gluteus maximus', difficulty: 'Easy', category: 'Biology' },
      { question: 'What is the function of platelets?', options: ['Clot blood', 'Carry oxygen', 'Fight infection', 'Transport nutrients'], correctAnswer: 'Clot blood', difficulty: 'Medium', category: 'Biology' },
      { question: 'What is the study of tissues?', options: ['Histology', 'Cytology', 'Anatomy', 'Physiology'], correctAnswer: 'Histology', difficulty: 'Medium', category: 'Biology' },
    ],
    'upsc': [
      { question: 'Who is the current Prime Minister of India?', options: ['Narendra Modi', 'Rahul Gandhi', 'Amit Shah', 'Yogi Adityanath'], correctAnswer: 'Narendra Modi', difficulty: 'Easy', category: 'Polity' },
      { question: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], correctAnswer: 'Delhi', difficulty: 'Easy', category: 'Geography' },
      { question: 'Who wrote the Indian Constitution?', options: ['Gandhi', 'Nehru', 'Ambedkar', 'Sardar Patel'], correctAnswer: 'Ambedkar', difficulty: 'Medium', category: 'Polity' },
      { question: 'What is the largest state in India by area?', options: ['Uttar Pradesh', 'Maharashtra', 'Rajasthan', 'Madhya Pradesh'], correctAnswer: 'Rajasthan', difficulty: 'Medium', category: 'Geography' },
      { question: 'What is the currency of India?', options: ['Rupee', 'Dollar', 'Euro', 'Pound'], correctAnswer: 'Rupee', difficulty: 'Easy', category: 'Economy' },
      { question: 'Who was the first President of India?', options: ['Gandhi', 'Nehru', 'Rajendra Prasad', 'Sardar Patel'], correctAnswer: 'Rajendra Prasad', difficulty: 'Medium', category: 'Polity' },
      { question: 'What is the highest mountain in India?', options: ['Kanchenjunga', 'Nanda Devi', 'Kangchenjunga', 'Makalu'], correctAnswer: 'Kangchenjunga', difficulty: 'Medium', category: 'Geography' },
      { question: 'What is the official language of India?', options: ['Hindi', 'English', 'Sanskrit', 'Urdu'], correctAnswer: 'Hindi', difficulty: 'Easy', category: 'Polity' },
      { question: 'Who led the Salt March?', options: ['Gandhi', 'Nehru', 'Sardar Patel', 'Rajguru'], correctAnswer: 'Gandhi', difficulty: 'Medium', category: 'History' },
      { question: 'What is the number of Lok Sabha seats?', options: ['543', '545', '547', '549'], correctAnswer: '543', difficulty: 'Medium', category: 'Polity' },
      { question: 'What is the longest river in India?', options: ['Ganges', 'Yamuna', 'Brahmaputra', 'Godavari'], correctAnswer: 'Ganges', difficulty: 'Easy', category: 'Geography' },
      { question: 'Who was the first woman Prime Minister of India?', options: ['Indira Gandhi', 'Sonia Gandhi', 'Mayawati', 'Jayalalitha'], correctAnswer: 'Indira Gandhi', difficulty: 'Medium', category: 'Polity' },
      { question: 'What is the national animal of India?', options: ['Lion', 'Tiger', 'Elephant', 'Leopard'], correctAnswer: 'Tiger', difficulty: 'Easy', category: 'General' },
      { question: 'What is the GDP ranking of India?', options: ['5th', '6th', '7th', '8th'], correctAnswer: '5th', difficulty: 'Medium', category: 'Economy' },
      { question: 'Who discovered India?', options: ['Columbus', 'Vasco da Gama', 'Cook', 'Magellan'], correctAnswer: 'Vasco da Gama', difficulty: 'Medium', category: 'History' },
    ],
  },
};

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const hasInitializedQuestions = useRef(false);

  const fetchLeaderboard = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const sorted = registeredUsers.sort((a: any, b: any) => (b.xp || 0) - (a.xp || 0));
    setLeaderboard(sorted.slice(0, 3));
  };

  useEffect(() => {
    fetchLeaderboard();

    // Listen for storage changes from other tabs
    window.addEventListener('storage', fetchLeaderboard);
    // Listen for custom event from same tab
    window.addEventListener('leaderboardUpdate', fetchLeaderboard);

    return () => {
      window.removeEventListener('storage', fetchLeaderboard);
      window.removeEventListener('leaderboardUpdate', fetchLeaderboard);
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUserData(parsedUser);
      if (parsedUser.xp) {
        setScore(parsedUser.xp);
      }
    } else {
      // Ensure quiz initializes even when no user is logged in
      const defaultUser = { class: '10th', purpose: 'regular study', xp: 0 };
      setUserData(defaultUser);
      setScore(0);
    }
  }, []);

  useEffect(() => {
    if (!userData || hasInitializedQuestions.current) return;

    hasInitializedQuestions.current = true;

    const grade = userData.class || '10th';
    const purpose = userData.purpose?.toLowerCase() || 'regular study';
    const pool = questionPools[grade]?.[purpose] || questionPools['10th']['regular study'];

    // Only use questions from core Science/Math subjects.
    const allowedCategories = new Set(['Math', 'Physics', 'Chemistry', 'Biology']);
    const filteredPool = pool.filter((q) => allowedCategories.has(q.category));
    const fallbackPool = questionPools['10th']['regular study'].filter((q) =>
      allowedCategories.has(q.category)
    );
    const effectivePool = filteredPool.length ? filteredPool : fallbackPool;

    // Select 10 questions with mix of difficulties: 4 Easy, 4 Medium, 2 Hard
    const easyQuestions = effectivePool
      .filter((q) => q.difficulty === 'Easy')
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    const mediumQuestions = effectivePool
      .filter((q) => q.difficulty === 'Medium')
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    const hardQuestions = effectivePool
      .filter((q) => q.difficulty === 'Hard')
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const selectedQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

    // If not enough, fill with random from effectivePool
    if (selectedQuestions.length < 10) {
      const remaining = effectivePool
        .filter((q) => !selectedQuestions.includes(q))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10 - selectedQuestions.length);
      selectedQuestions.push(...remaining);
    }

    // Shuffle the selected 10 questions
    const shuffled = selectedQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestion(shuffled[0]);
    setQuestionIndex(0); // Reset index
    setAnswered(0); // Reset answered count
    setSessionCorrect(0); // Reset correct counter for accurate accuracy
    setQuizFinished(false); // Reset finished state
  }, [userData]);

  const handleAnswer = (correct: boolean) => {
    setAnswered((prev) => prev + 1);
    if (correct) {
      setSessionCorrect((prev) => prev + 1);
      const newScore = score + 100;
      setScore(newScore);
      toast.success('🎉 Correct! +100 XP');

      if (userData) {
        const updatedUser = { ...userData, xp: newScore };
        setUserData(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const updatedUsers = registeredUsers.map((u: any) =>
          u.email === userData.email ? { ...u, xp: newScore } : u
        );
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

        window.dispatchEvent(new Event('leaderboardUpdate'));
      }
    } else {
      toast.error('❌ Not quite right. Keep trying!');
    }

    const newAnswered = answered + 1;
    if (newAnswered >= 10) {
      setQuizFinished(true);
    } else {
      // Move to next question
      const nextIndex = (questionIndex + 1) % questions.length;
      setQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground />

      <div
        className="fixed top-[30%] left-[25%] w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="fixed bottom-[25%] right-[30%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 27, 141, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Header */}
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text">
                Quiz Arena
              </h1>
              <p className="text-muted-foreground">Test your knowledge and compete</p>
            </div>

            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-card border border-primary/30 p-6 text-center glow-pink">
                  <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold text-foreground">{score}</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
                <div className="rounded-2xl bg-card border border-secondary/30 p-6 text-center glow-blue">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <div className="text-3xl font-bold text-foreground">{answered}</div>
                  <div className="text-sm text-muted-foreground">Answered</div>
                </div>
                <div className="rounded-2xl bg-card border border-accent/30 p-6 text-center glow-purple">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-3xl font-bold text-foreground">
                    {answered > 0 ? Math.round((sessionCorrect / Math.max(answered, 1)) * 100) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
              </div>

              {/* Question */}
              <div className="rounded-3xl bg-card border border-primary/30 p-8 glow-pink">
                <div className="space-y-6">
                  {quizFinished ? (
                    <>
                      <div className="text-center">
                        <h2 className="text-3xl font-bold text-foreground">Quiz Complete!</h2>
                        <p className="text-muted-foreground mt-2">Your final accuracy: {Math.round((sessionCorrect / 10) * 100)}%</p>
                        <p className="text-muted-foreground">Correct answers: {sessionCorrect}/10</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Question {answered + 1}</span>
                        <span className="text-sm text-primary font-bold">{currentQuestion?.difficulty || 'EASY'}</span>
                      </div>

                      <h2 className="text-2xl font-bold text-foreground">
                        {currentQuestion?.question || 'Loading question...'}
                      </h2>

                      <div className="space-y-4">
                        {currentQuestion?.options.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleAnswer(option === currentQuestion.correctAnswer)}
                            className="w-full justify-start text-left h-auto py-4 px-6 bg-input border border-primary/20 hover:border-primary hover:bg-primary/10 rounded-xl transition-all"
                            variant="outline"
                          >
                            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 text-primary font-bold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-foreground">{option}</span>
                          </Button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-card border border-amber-500/30 p-6 glow-orange">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Leaderboard</h2>
                  <p className="text-sm text-muted-foreground">Top 3 Students</p>
                </div>
              </div>

              <div className="space-y-4">
                {leaderboard.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No students registered yet.
                  </div>
                ) : (
                  leaderboard.map((user, index) => (
                    <div
                      key={user.email}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                          ${index === 0 ? 'bg-amber-500 text-black' :
                            index === 1 ? 'bg-gray-300 text-black' :
                              index === 2 ? 'bg-amber-700 text-white' : 'bg-primary/20 text-primary'}`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.school || 'Student'}</p>
                        </div>
                      </div>
                      <div className="font-bold text-primary">
                        {user.xp || 0} XP
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 text-center text-xs text-muted-foreground">
                <p>Updates in real-time across all active sessions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
