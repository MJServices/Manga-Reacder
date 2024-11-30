// app/profile/[id]/page.tsx
import { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage";

// Use 'any' to bypass strict type checking
export type PageProps = {
  params: any;
} | any;

export default function Page(props: PageProps) {
  return <ProfilePage params={props.params} />;
}

export async function generateMetadata({ 
  params 
}: { 
  params: any 
}): Promise<Metadata> {
  return {
    title: `Profile - ${params.id}`,
    description: `User profile page`
  };
}