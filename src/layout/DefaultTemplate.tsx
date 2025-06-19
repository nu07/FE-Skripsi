import { useEffect, useState } from "react";
import NavbarHome from "@/components/navbar/NavbarHome";
import DefaultFooter from "@/components/footer/DefaultFooter";
import authStore from "@/store/loginStore";

export default function DefaultTemplate({ children }: { children: any }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchedEmail = authStore.getState().getEmail();
    setEmail(fetchedEmail);
  }, []);

  return (
    <div className="bg-white">
      <NavbarHome />
      {children}
      <DefaultFooter />
      {email && <div className="fixed bottom-4 left-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">Login sebagai {email}</div>}
    </div>
  );
}
