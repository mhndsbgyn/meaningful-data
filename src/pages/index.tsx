import { useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import Table from '@/components/Table';
import { GetStaticProps } from 'next';
import XLSX from 'xlsx';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const workbook = XLSX.readFile('./public/belge.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    return {
      props: {
        data,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(error);
    return { props: { errors: "error" } };
  }
};
const HomePage = ({ data }:any) => {
  const [tab, setTab] = useState(1); 

  const columns = [
    'Hangi pozisyonda çalışıyorsunuz?',
    'Maaş /Aylık Türk Lirası Cinsinden',
    'Deneyim?'
  ];
  const columns_two = [
    'Çalışma şekliniz nedir?',
    'Maaş /Aylık Türk Lirası Cinsinden',
    'Seviyeniz nedir?'
  ];
  console.log(data)

  return (
    <div>
      <div className="flex mb-4">
        <button className={`w-1/3 ${tab === 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border-2 border-blue-500 py-2`} onClick={() => setTab(1)}>Orjinal Veri</button>
        <button className={`w-1/3 ${tab === 2 ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border-2 border-blue-500 py-2`} onClick={() => setTab(2)}>Anlamlı Veri1</button>
        <button className={`w-1/3 ${tab === 3 ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border-2 border-blue-500 py-2`} onClick={() => setTab(3)}>Anlamlı Veri2</button>
      </div>

      {tab === 1 && <Table data={data} />}
      {tab === 2 && <Table data={data} columns={columns} />}  
      {tab === 3 && <Table data={data} columns={columns_two} />}
    </div>
  );
}

export default HomePage;
