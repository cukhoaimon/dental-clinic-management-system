import decorate1 from "/decorate1.svg";
import decorate2 from "/decorate2.svg";
function Footer() {
  return (
    <div className="mt-10">
      <img className="absolute" src={decorate2}></img>
      <img src={decorate1}></img>
    </div>
  );
}
export default Footer;
