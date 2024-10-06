/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button.jsx';
import axios from 'axios';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [year, setYear] = useState(2);
  const [profileImage, setProfileImage] = useState('');

  // Fetch GitHub Profile Image
  const getProfileImage = async () => {
    try {
      const response = await axios.get('https://api.github.com/users/MishraShardendu22');
      if (response.data?.avatar_url) {
        setProfileImage(response.data.avatar_url);
      } else {
        setProfileImage('API Overloaded with Requests !!');
        console.error('No avatar URL found.');
      }
    } catch (error) {
      console.error('Error fetching Github profile image:', error);
    }
  };

  useEffect(() => {
    getProfileImage();
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    setYear(currentYear - startYear + 1);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('shardendumishra01@gmail.com');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        
        {/* Profile Image Section */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container p-4 sm:p-5">
            <img src={profileImage} alt="Profile" className="w-full sm:h-[250px] h-fit object-contain rounded-xl border-2 border-gray-600" />
            <div>
              <p className="pt-8 grid-headtext">Hi, I’m Mishra Shardendu</p>
              <p className="grid-subtext">
                I’m a {year}nd year student at IIIT Dharwad with a deep passion for web development and machine learning.
                I love exploring cutting-edge technologies to build innovative solutions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tech Stack Section */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container p-4 sm:p-5">
            <img src="assets/grid2.webp" className="rounded-xl w-full sm:h-[250px] h-fit object-contain" alt="Tech Stack" />
            <div>
              <p className="pt-8 grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in:
                <br />
                <strong>Languages:</strong> Go, C++, JavaScript, TypeScript, Python
                <br />
                <strong>Frameworks/Tools:</strong> React, Next.js, Express, Node.js, Figma
                <br />
                <strong>APIs:</strong> GraphQL, REST, SOAP
                <br />
                <strong>Other:</strong> Vite, Tailwind CSS, Docker, Kubernetes, MongoDB
              </p>
            </div>
          </div>
        </div>
        
        {/* Globe Section */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container p-4 sm:p-5">
            <div className="rounded-3xl w-full sm:h-[300px] h-fit flex justify-center items-center">
              <Globe
                height={300}
                width={300}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 40, lng: -100, text: 'Kanpur, Uttar Pradesh', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">Remote Work Enthusiast</p>
              <p className="grid-subtext">Based in Kanpur, open to global opportunities with flexible communication across time zones.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>
        
        {/* Coding Passion Section */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container p-4 sm:p-5">
            <img src="assets/grid3.png" alt="Coding Passion" className="w-full sm:h-[250px] h-fit object-contain rounded-xl" />
            <div>
              <p className="grid-headtext py-8">Coding Is My Passion</p>
              <p className="grid-subtext">
                Programming isn’t just a profession—it’s my passion. I’m always keen on learning new technologies and 
                pushing boundaries, particularly in Generative AI, backend development, and Machine Learning.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="xl:col-span-1 xl:row-span-3">
          <div className="grid-container p-4 sm:p-5">
            <img src="assets/cnct.svg" alt="Contact" className="w-full sm:h-[250px] h-fit object-contain rounded-xl" />
            <div className="pt-8">
              <p className="grid-headtext">Get in Touch</p>
              <div className="flex items-center space-x-4 py-4">
                <button onClick={handleCopy} className="flex items-center space-x-4">
                  <img 
                    src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} 
                    alt="copy" 
                    className="h-13 w-13" 
                  />
                </button>
                <p className="text-lg font-medium text-gray-400">shardendumishra01@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
