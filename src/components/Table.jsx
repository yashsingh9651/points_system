"use cient";
import { Card, Typography } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { fetchData, showBox } from "@/redux/slices/user";

const Table = ({ data, tableHead, type }) => {
  const { email } = useSelector((state) => state.user.userData);
  // Updating the transation status for
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const updateStatus = async (_id) => {
    setLoading(true);
    const res = await axios.put("/api/admin/updateTrans", { email, _id });
    if (res.data.success) {
      dispatch(fetchData(email));
    }
    toast.success(res.data.message);
    setLoading(false);
  };
  if (type === "USERS") {
    return (
      <Card className="h-full w-full xl:w-4/5 mx-auto overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={user._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {user.username}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {user.occupation}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {user.points}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {user.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      color="blue-gray"
                      onClick={() =>
                        dispatch(showBox({email,username:user.username,occupation:user.occupation,userEmail:user.email,_id:user._id}))
                      }
                      className="font-medium text-center px-4 cursor-pointer hover:scale-105 duration-300 bg-gray-400 py-2 rounded-md"
                    >
                      Edit
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    );
  } else {
    return (
      <Card className="h-full w-full xl:w-4/5 mx-auto overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={user._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {user.username}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {user.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {user.amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div
                      className={`${
                        user.status === "pending"
                          ? "bg-red-400"
                          : "bg-green-500"
                      } font-normal p-4 py-2 rounded-md text-[#F1F1F1] text-center capitalize`}
                    >
                      {user.status}
                    </div>
                  </td>
                  <td className={classes}>
                    <button
                      onClick={() => updateStatus(user._id)}
                      disabled={loading}
                      variant="small"
                      color="blue-gray"
                      className="font-medium w-full text-center bg-gray-500 py-2 hover:scale-105 duration-300 text-white rounded-md cursor-pointer"
                    >
                      {user.status === "pending" ? "Approve" : "Reject"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    );
  }
};
export default Table;