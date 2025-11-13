import { defineStore } from 'pinia'
import servicesA from '@/assets/images/servicesA.jpg'
import servicesB from '@/assets/images/servicesB.jpg'
import servicesC from '@/assets/images/servicesC.jpg'
import servicesD from '@/assets/images/servicesD.jpg'
import servicesE from '@/assets/images/servicesE.jpg'
import servicesF from '@/assets/images/servicesF.jpg'


export const useServicesStore = defineStore('service', {
  state: () => ({
    services: [
  {
    title: 'Medical Facility Maintenance',
    description: 'Specialized maintenance for hospitals and clinics, ensuring uninterrupted operation of critical medical equipment and infrastructure.',
    image: `${servicesA}`
  },
  {
    title: 'Printing & Gas Equipment Service',
    description: 'Technical support and maintenance for industrial printers and gas systems, ensuring precision and safety in production environments.',
        image: `${servicesB}`

  },
  {
    title: 'Fuel Station & Energy Systems',
    description: 'Comprehensive service for fuel stations and energy distribution systems, focusing on safety, uptime, and regulatory compliance.',
        image: `${servicesC}`

  },
  {
    title: 'Crude Oil Infrastructure',
    description: 'Maintenance and inspection of crude oil pipelines, storage units, and extraction systems with high safety and operational standards.',
        image: `${servicesD}`

  },
  {
    title: 'Elevator & Lift Systems',
    description: 'Reliable maintenance and emergency support for elevators and vertical transport systems in residential and commercial buildings.',
        image: `${servicesE}`

  },
   {
    title: 'Alarm & Protection Systems',
    description: 'Installation and maintenance of advanced alarm and security systems, ensuring safety and protection for residential, commercial, .',
    image: `${servicesF}`
  }
],

  
  }),
})