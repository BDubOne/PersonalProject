import { CSSTransition } from 'react-transition-group';
import '../transitions.css'; 

const AnimatedRoute = ({ children, timeout = 300, classNames = "fade" }) => {
  return (
    <CSSTransition in appear timeout={timeout} classNames={classNames} unmountOnExit>
      {children}
    </CSSTransition>
  );
};

export default AnimatedRoute;
