import { protectPage } from "../features/auth/utils";
import Banner from "./_components/banner";
import ProjectsSection from "./_components/projects-section";

export default async function Home() {
  await protectPage();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto py-8">
      <Banner />
      <ProjectsSection />
    </div>
  );
}
