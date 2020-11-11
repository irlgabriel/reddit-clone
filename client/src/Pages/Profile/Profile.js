import react from "react"
import { Sidebar } from "../../Components";
import { 
  MainWrapper, 
  UserActivities 
} from "./Profile.components";
const Profile = () => {
  return (
    <MainWrapper>
      <UserActivities>
        {/** Search for posts/comments made by this user here */}
      </UserActivities>
      <Sidebar />
    </MainWrapper>
  )
}

export default Profile;