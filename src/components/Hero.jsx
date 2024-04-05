import Button from "../components/Button";

const Hero = () => {
  return (
    <section className="relative min-w-full aspect-[1125/512] bg-[url('../src/assets/bg-doctor.png')] bg-no-repeat bg-cover flex flex-col justify-center">
      <div className="px-36">
        <h3 className="text-skyblue uppercase font-bold font-worksans my-2">
          Caring for life
        </h3>
        <h1 className="text-darkblue font-bold font-worksans text-5xl my-2">
          Leading the Way <br /> in Medical Excellence
        </h1>
        <Button
          className="bg-lightblue rounded-full font-bold font-sm px-4 py-2 my-2"
          href="services"
        >
          Our Services
        </Button>
      </div>
    </section>
  );
};

export default Hero;
