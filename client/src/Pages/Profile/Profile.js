import react from "react"
import { Sidebar } from "../../Components";
import { 
  MainWrapper, 
  UserActivities 
} from "./Profile.components";
const Profile = ({user}) => {

  return (
    <MainWrapper>
      <UserActivities>
        {/** Search for posts/comments made by this user here */}
      </UserActivities>
      <Sidebar profileUser={user}/>
    </MainWrapper>
  )
}

export default Profile;