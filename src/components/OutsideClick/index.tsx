import React from 'react';

interface OutsideClickProps {
  onClickOutside: () => void;
  message: string | JSX.Element;
  show: boolean;
}

const OutsideClick: React.FC<OutsideClickProps> = ({ onClickOutside, message, show }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
        onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!show) return null;

  return (
    <div ref={ref} className="info-box">
      {message}
    </div>
  );
};

export default OutsideClick;
