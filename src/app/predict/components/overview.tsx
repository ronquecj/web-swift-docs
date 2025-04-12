'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import axios from '../../../api/axios';
import { useEffect, useState } from 'react';
const ALL_REQUESTS = 'request/';
import CryptoJS from 'crypto-js';

export function Overview() {
  const [months, setMonths] = useState([
    { name: 'Jan', date: 0 },
    { name: 'Feb', date: 0 },
    { name: 'Mar', date: 0 },
    { name: 'Apr', date: 0 },
    { name: 'May', date: 0 },
    { name: 'Jun', date: 0 },
    { name: 'Jul', date: 0 },
    { name: 'Aug', date: 0 },
    { name: 'Sep', date: 0 },
    { name: 'Oct', date: 0 },
    { name: 'Nov', date: 0 },
    { name: 'Dec', date: 0 },
  ]);
  const [requests, setRequests] = useState([]);
  const [mostRequested, setMostRequested] = useState([]);

  useEffect(() => {
    const getPredictions = async () => {
      try {
        const response = await axios.get(ALL_REQUESTS);
        setRequests(
          response.data.map(
            (d) => d.createdAt.split('T')[0].split('-')[1]
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    const getMostRequested = async () => {
      try {
        const response = await axios.get(ALL_REQUESTS);
        setMostRequested(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMostRequested();
    getPredictions();
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      const updatedMonths = [...months];
      requests.forEach((m) => {
        const index = parseInt(m, 10) - 1;
        if (updatedMonths[index]) {
          updatedMonths[index].date++;
        }
      });

      setMonths(updatedMonths);
    }
  }, [requests]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={months}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="date"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
