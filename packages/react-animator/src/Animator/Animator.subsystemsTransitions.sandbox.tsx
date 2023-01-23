import React, { ReactElement, useState, CSSProperties, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Animated, aaProperty, aaOpacity } from '@arwes/react-animated';

// LINK

interface LinkProps {
  path: string
  bg: string
  bgActive: string
  active: boolean
  onLink: (path: string) => void
}

const Link = (props: LinkProps): ReactElement => {
  const { path, bg, bgActive, active, onLink } = props;
  return (
    <div
      style={{
        backgroundColor: active ? bgActive : bg,
        cursor: 'pointer',
        transition: 'background-color 200ms ease-out'
      }}
      onClick={() => onLink(path)}
    />
  );
};

// HEADER

interface HeaderProps {
  path: string
  onLink: (path: string) => void
}

const Header = (props: HeaderProps): ReactElement => {
  const { path, onLink } = props;
  return (
    <Animator combine>
      <Animated
        as='header'
        style={{
          gridArea: 'header',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#055'
        }}
        animated={[aaOpacity(), aaProperty('y', 20, 0)]}
      >
        <Link path='a' active={path === 'a'} bg='#550' bgActive='#aa0' onLink={onLink} />
        <Link path='b' active={path === 'b'} bg='#707' bgActive='#c0c' onLink={onLink} />
        <Link path='c' active={path === 'c'} bg='#050' bgActive='#0a0' onLink={onLink} />
        <Link path='' active={path === ''} bg='#555' bgActive='#aaa' onLink={onLink} />
      </Animated>
    </Animator>
  );
};

// FOOTER

const Footer = (): ReactElement => {
  return (
    <Animator>
      <Animated
        as='footer'
        style={{ gridArea: 'footer', backgroundColor: '#055' }}
        animated={[aaOpacity(), aaProperty('y', -20, 0)]}
      />
    </Animator>
  );
};

// PANEL LEFT

const PanelLeft = (): ReactElement => {
  return (
    <Animator>
      <Animated
        as='aside'
        style={{ gridArea: 'panelLeft', backgroundColor: '#055' }}
        animated={[aaOpacity(), aaProperty('x', 20, 0)]}
      />
    </Animator>
  );
};

// PANEL RIGHT

const PanelRight = (): ReactElement => {
  return (
    <Animator>
      <Animated
        as='aside'
        style={{ gridArea: 'panelRight', backgroundColor: '#055' }}
        animated={[aaOpacity(), aaProperty('x', -20, 0)]}
      />
    </Animator>
  );
};

// ITEM

interface ItemProps {
  style?: CSSProperties
  bg: string
}

const Item = (props: ItemProps): ReactElement => {
  const { style, bg } = props;
  return (
    <Animator>
      <Animated
        style={{ ...style, backgroundColor: bg }}
        animated={aaOpacity()}
      />
    </Animator>
  );
};

// SUBSYSTEMS

const SubsystemA = (): ReactElement => {
  return (
    <Animator manager='stagger' combine>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateRows: 'repeat(5, 1fr)',
          width: '100%',
          height: '100%'
        }}
      >
        {Array(5).fill(0).map((_, i) => <Item key={i} bg='#550' />)}
      </div>
    </Animator>
  );
};

const SubsystemB = (): ReactElement => {
  return (
    <Animator manager='stagger' combine>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateRows: 'repeat(5, 1fr)',
          width: '100%',
          height: '100%'
        }}
      >
        {Array(5).fill(0).map((_, i) => <Item key={i} bg='#707' />)}
      </div>
    </Animator>
  );
};

const SubsystemC = (): ReactElement => {
  return (
    <Animator manager='stagger' combine>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateRows: 'repeat(5, 1fr)',
          width: '100%',
          height: '100%'
        }}
      >
        {Array(5).fill(0).map((_, i) => <Item key={i} bg='#050' />)}
      </div>
    </Animator>
  );
};

//

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);
  const [path, setPath] = useState('a');

  useEffect(() => {
    if (path === '') {
      setActive(false);
    }
  }, [path]);

  return (
    <Animator
      active={active}
      manager='stagger'
      combine
      duration={{ stagger: 0.1 }}
    >
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: '1rem',
        color: '#fff'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateAreas: `
            "header header header"
            "panelLeft main panelRight"
            "footer footer footer"
          `,
          gridTemplateColumns: '20% 1fr 20%',
          gridTemplateRows: 'minmax(80px, 10%) 1fr minmax(80px, 10%)',
          gap: '1rem',
          width: '100%',
          height: '100%'
        }}>
          <Animator combine>
            <Header path={path} onLink={path => setPath(path)} />
            <Footer />
          </Animator>
          <Animator combine>
            {(path === 'a' || path === 'b') && <PanelLeft />}
            {path === 'a' && <PanelRight />}
          </Animator>
          <main style={{ gridArea: 'main' }}>
            {path === 'a' && <SubsystemA />}
            {path === 'b' && <SubsystemB />}
            {path === 'c' && <SubsystemC />}
          </main>
        </div>
      </div>
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);