import Link from "next/Link"
import Image from "next/Image"
import logo from "../public/disney.svg"

function NavBar({account}) {
  return (
    <div className="navbar">
      <div className="logo-wrapper"><Link href="/"><Image src={logo} alt={"disney logo"} width={90} height={50}/></Link></div>
      <div className="account-info">
        <p>Welcome {account.username}!</p>
        <img className="avatar" src={account.avatar.url}></img>
      </div>
    </div>
  )
}

export default NavBar
