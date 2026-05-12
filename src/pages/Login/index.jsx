import LoginForm from "../../components/LoginForm"


export const Login = () => {
  return (
    <section className="w-full min-h-screen flex">
        <div className="w-1/2 bg-[#c23e3e] md:flex justify-center items-center hidden">
            <img src="./public/images/banner-carro.png" alt="" />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-200">
            <LoginForm/>
        </div>
    </section>
  )
}
