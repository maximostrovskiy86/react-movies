import css from "./Loader.module.css";
import { Audio } from "react-loader-spinner";


const Loader = () => {
  return (
    <div className={css.wrapper}>
      <Audio
        height={80}
        width={80}
        radius={9}
        color="green"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper"
      />
    </div>
  );
};

export default Loader;