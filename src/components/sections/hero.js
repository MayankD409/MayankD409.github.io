import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  text-align: left;
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  min-height: 100svh; // mobile browsers: ignore the collapsing URL bar
  padding: var(--nav-height) 0 60px;

  @media (min-width: 768px) {
    text-align: justify; // justified text gets ugly rivers on a narrow column
  }

  @media (max-height: 700px) and (min-width: 700px) {
    min-height: auto;
  }

  h1 {
    margin: 0 0 20px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    font-size: clamp(30px, 7vw, 70px);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 570px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Mayank Deshpande.</h2>;
  const three = <h3 className="big-heading">I love to build Software</h3>;
  const four = (
    <>
      <p>
        I'm a <strong>Perception Engineer</strong> at <strong>Contoro Robotics</strong>, where I own
        the stack that lets our robots actually see what they're picking up—cameras, LiDAR,
        segmentation models, and a whole lot of 3D geometry.
      </p>

      <p>
        Outside of work my head is mostly in <strong>Multimodal</strong> and{' '}
        <strong>Embodied AI</strong>, and I build <strong>RAG</strong> and{' '}
        <strong>AI engineering</strong> projects on weekends just to see how far I can push them. I
        also read about <strong>markets and finance</strong> almost every day.
      </p>

      <p>
        Always looking to work on exciting projects—feel free to <a href="#contact">reach out</a> if
        you'd like to build something amazing together!
      </p>
    </>
  );
  const five = (
    <a href="/resume.pdf" className="email-link" target="_blank" rel="noopener noreferrer">
      My Resume
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
