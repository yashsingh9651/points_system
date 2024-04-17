import { getTokenData } from "@/helpers/getTokenData";
import {NextResponse} from "next/server"
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function GET(request){
    try {
        const userId = await getTokenData(request);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({user,message:"User Found",success:true})
    } catch (error) {
        return NextResponse.json({error:error.message,success:false});
    }
}