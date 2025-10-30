import AddName from "@/components/AddName";
import Footer from "@/components/Footer";
import NameList from "@/components/NameList";
import { Pagination } from "@/components/ui/pagination";
import Filter from "@/components/Filter";
import { useEffect, useMemo, useState } from "react";
import PaginationList from "@/components/PaginationList";
import api from "@/api/axios";
import { isThisMonth, isThisWeek, isToday, parseISO } from "date-fns";
import { ToastContainer } from "react-toastify";
import { visibleNameOnPage } from "@/lib/data";

const HomePage = () => {
  const [nameBuffer, setNameBuffer] = useState([]);
  const [filter, setFilter] = useState("today");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchName = async () => {
    try {
      const res = await api.get("/names");
      setNameBuffer(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Lay du lieu that bai", error);
    }
  };

  const dateQuery = useMemo(() => {
    return nameBuffer.filter((name) => {
      const date = parseISO(name.createdAt);
      switch (filter) {
        case "today":
          return isToday(date);
        case "week":
          return isThisWeek(date);
        case "month":
          return isThisMonth(date);
        default:
          return true;
      }
    });
  }, [filter, nameBuffer]);

  useEffect(() => {
    fetchName();
  }, []);

  //
  const visibleNameNumber = dateQuery.slice(
    (currentPage - 1) * visibleNameOnPage,
    currentPage * visibleNameOnPage
  );
  // Tổng số trang
  const totalPage = Math.ceil(dateQuery.length / visibleNameOnPage);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      <div className="container relative z-10">
        <ToastContainer />
        <div className="mx-auto w-full h-full">
          <div className="text-center my-4">
            <h1 className="text-4xl font-bold bg-linear-to-r from-cyan-500 via-green-500 to-blue-500 bg-clip-text text-transparent capitalize p-4">
              App nhập tên
            </h1>
          </div>
          <AddName handleNameAdded={fetchName} />
          <NameList
            nameBuffer={visibleNameNumber}
            handleNameAdded={fetchName}
          />
          <div className="flex justify-between mt-4">
            <PaginationList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
            <Filter
              setCurrentPage={setCurrentPage}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
