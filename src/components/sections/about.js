// VISITED BUT PLAY AROUND WITH THIS
import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  text-align: left;

  @media (min-width: 768px) {
    text-align: justify; // justified text gets ugly rivers on a narrow column
  }

  ul.skills-list {
    display: grid;
    // grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-template-columns: 1fr; // Use a single column for all items
    // grid-gap: 0 10px; // Lynn does not have this
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '❖';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      // background: transparent;
      // outline: 0;

      // &:after {
      //   top: 15px;
      //   left: 15px;
      // }

      // Lynn used above hover settings

      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      // mix-blend-mode: multiply; // Adds bluish tint to the picture
      // filter: grayscale(100%) contrast(1); // Makes image grayscale pre-hover
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Languages: Python, C++ (11/14/17), CUDA, MATLAB, Bash',
    '3D Perception: Open3D, PCL, RANSAC & plane fitting, ICP, camera calibration, TF2, occupancy mapping, 6-DoF pose estimation',
    'Deep Learning: PyTorch, Detectron2, Mask R-CNN, PointRend, DETR, SAM, DINOv2, ViT, ONNX, TensorRT',
    'Robotics & Tooling: ROS1/ROS2, RGB-D cameras, 2D/3D LiDAR, MoveIt, Gazebo, CARLA, Docker, Git, pytest, GoogleTest',
  ];

  return (
    <StyledAboutSection
      id="about"
      ref={revealContainer}
      itemScope
      itemType="https://schema.org/Person">
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p itemProp="description">
              I absolutely love talking <strong>Football, Finance, and Startups</strong>—and
              honestly, I think the life would've been way more exciting if I was already working in
              one of these <em>(but hey, I'm getting there!)</em>.
            </p>

            <p>
              Something else I find really cool? <strong itemProp="knowsAbout">Robots</strong>. I
              did my <strong itemProp="alumniOf">Master's in Robotics</strong> at Maryland, where I
              spent countless hours diving into Controls,{' '}
              <span itemProp="knowsAbout">Perception</span>, and way too much{' '}
              <span itemProp="knowsLanguage">C++</span>. These days I'm a{' '}
              <strong>Perception Engineer at Contoro Robotics</strong>, owning the perception stack
              for a fleet of autonomous unloading robots—RGB-D cameras, LiDAR, segmentation models,
              calibration, and the 3D geometry that ties it all together.
            </p>

            <p>
              What actually got me here was a course on{' '}
              <strong itemProp="knowsAbout">Multimodal Foundation Models</strong>. I got completely
              hooked and couldn't stop exploring them, and that's still where my head goes outside
              of work: <strong itemProp="knowsAbout">Embodied AI</strong>, plus <strong>RAG</strong>{' '}
              and <strong>AI engineering</strong> projects I build on weekends just to see how far I
              can push them. One thing I've realized along the way: it's incredibly valuable to
              master one area deeply before branching out—being able to claim mastery over a domain
              has so much cross-applicability <em>(Thank You, Kyle!)</em>
            </p>

            <p>
              I'm excited for all the great conversations and adventures ahead as I keep exploring
              this fascinating journey!
            </p>

            <ul className="skills-list">
              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/cali_zoomed.jpeg" //either me.jpg or ups-shot.jpg
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Mayank Deshpande - Robotics Software Engineer"
              itemProp="image"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
