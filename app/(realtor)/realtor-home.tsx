import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const RealtorHomePage = () => {
  // Sample data for properties, leads, and appointments
  const listings = [
    { id: 1, image: 'https://via.placeholder.com/150', price: '$350,000', address: '1234 Elm St' },
    { id: 2, image: 'https://via.placeholder.com/150', price: '$500,000', address: '5678 Oak Ave' },
  ];

  const leads = [
    { name: 'John Doe', contact: 'john@example.com', status: 'New Lead' },
    { name: 'Jane Smith', contact: 'jane@example.com', status: 'Follow Up' },
  ];

  const appointments = [
    { date: '2024-11-12', time: '10:00 AM', address: '1234 Elm St' },
    { date: '2024-11-13', time: '2:00 PM', address: '5678 Oak Ave' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      {/* Header Section */}
      <View style={{ backgroundColor: '#0286FF', padding: 20, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>Welcome, Realtor!</Text>
        <Text style={{ color: 'white', marginTop: 5, fontSize: 16 }}>Manage your listings, leads, and appointments here.</Text>
      </View>

      {/* Dashboard Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
        <View style={{ alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Active Listings</Text>
          <Text style={{ fontSize: 24, color: '#0286FF' }}>2</Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Leads</Text>
          <Text style={{ fontSize: 24, color: '#0286FF' }}>2</Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Appointments</Text>
          <Text style={{ fontSize: 24, color: '#0286FF' }}>2</Text>
        </View>
      </View>

      {/* Listings Section */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Current Listings</Text>
        {listings.map((listing) => (
          <View
            key={listing.id}
            style={{
              flexDirection: 'row',
              backgroundColor: '#ffffff',
              marginVertical: 10,
              borderRadius: 8,
              padding: 15,
              elevation: 2,
            }}
          >
            <Image
              source={{ uri: listing.image }}
              style={{ width: 100, height: 100, borderRadius: 8, marginRight: 15 }}
            />
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{listing.price}</Text>
              <Text style={{ fontSize: 14, color: '#555' }}>{listing.address}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0286FF',
                  padding: 8,
                  marginTop: 12,
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Leads Section */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Leads</Text>
        {leads.map((lead, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#ffffff',
              marginVertical: 10,
              borderRadius: 8,
              padding: 15,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{lead.name}</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>{lead.contact}</Text>
            <Text style={{ fontSize: 14, color: lead.status === 'New Lead' ? '#28a745' : '#ff9800' }}>
              {lead.status}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#0286FF',
                padding: 8,
                marginTop: 12,
                borderRadius: 5,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Follow Up</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Appointments Section */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Upcoming Appointments</Text>
        {appointments.map((appointment, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#ffffff',
              marginVertical: 10,
              borderRadius: 8,
              padding: 15,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{appointment.date}</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>{appointment.time}</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>{appointment.address}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#0286FF',
                padding: 8,
                marginTop: 12,
                borderRadius: 5,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RealtorHomePage;
