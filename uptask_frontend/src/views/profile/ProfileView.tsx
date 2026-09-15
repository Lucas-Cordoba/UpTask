import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/hooks/useAuth"


export default function ProfileView() {
  const {data, isLoading} = useAuth() //trae la info del usuario logueado
  
  if(isLoading) return 'Cargando...'

  if(data)return <ProfileForm data={data}/>
}
