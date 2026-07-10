"use client"

import { Attendance, AttendanceData, attendanceEmployeeByUserId } from '@/app/api/attendance/attendance';
import Card from '@/components/Card'
import React, { useEffect, useState } from 'react'
// Import the loader icon from lucide-react
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const page = () => {
  const [attendanceReport, setAttendanceReport] = useState<Attendance[]>([]);
  // Add loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userData = localStorage.getItem('user')
  const user = userData ? JSON.parse(userData) : null

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const getAllAttendanceRecordList = async () => {
    try {
      setIsLoading(true);
      const response = await attendanceEmployeeByUserId({
        month,
        year,
        employeeId: user?.id,
      });

      console.log("Attendance Record:", response);

      setAttendanceReport(
        response?.data?.attendances || []
      );
    } catch (error) {
      console.error("Error fetching attendance record:", error);
    } finally {
      // Turn off loading whether the request succeeds or fails
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAttendanceRecordList();
  }, []);

  return (

    <>

      {/* <div className='border p-4'>
        <div>
          <Input type='date'/>
        </div>
      </div> */}

      <div className="w-full p-5">
        {isLoading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center min-h-50 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-gray-500 text-sm">Loading attendance records...</p>
          </div>
        ) : attendanceReport.length === 0 ? (
          /* No Record Found State */
          <div className="flex flex-col items-center justify-center min-h-50 border border-dashed rounded-lg p-6 bg-gray-50">
            <p className="text-gray-500 font-medium">No records found</p>
            <p className="text-gray-400 text-sm">There is no attendance data available for this period.</p>
          </div>
        ) : (
          /* Data Available State */
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
            {attendanceReport.map((item) => (
              <Card
                key={item.id}
                employeeId={item?.id}
                createdAt={item?.createdAt}
                checkInTime={item?.checkInTime}
                checkOutTime={item?.checkOutTime}
                status={item?.status}
              />
            ))}
          </div>
        )}
      </div>

    </>


  )
}

export default page