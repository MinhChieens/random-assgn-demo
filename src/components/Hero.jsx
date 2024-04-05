import Button from "../components/Button";

const Hero = () => {
  return (
    <section className="relative top-0 left-0 w-full bg-[url('../src/assets/hero-img.png')] bg-no-repeat bg-cover flex-col align-center justify-start">
      <h2 className="text-skyblue uppercase font-bold font-worksans">
        Caring for life
      </h2>
      <h1 className="text-darkblue font-bold font-worksans text-5xl">
        Leading the Way <br /> in Medical Excellence
      </h1>
      <Button
        className="bg-lightblue rounded-full font-sm px-4 py-2"
        href="services"
      >
        Our Services
      </Button>
    </section>
  );
};

export default Hero;
