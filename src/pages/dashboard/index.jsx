import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Dashboard from "../../Components/Organism/Dashboard/Dashboard";

export default function AuthLoginPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Please Login First')
      router.push('/')
    }
  }, [])
  return <Dashboard />;
}