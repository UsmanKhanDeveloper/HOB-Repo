import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  Linking,
  Alert
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@/constants';

const RealtorHomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    date: '',
    time: '',
    address: '',
    status: ''
  });
  const [isListingModalVisible, setIsListingModalVisible] = useState(false);
  const [newListing, setNewListing] = useState({
    image: '',
    price: '',
    address: '',
    description: ''
  });
  const [appointments, setAppointments] = useState([
    { clientName: 'John Doe', date: '2024-11-12', time: '10:00 AM', address: '1234 Elm St', status: 'Upcoming' },
    { clientName: 'Jane Smith', date: '2024-11-13', time: '2:00 PM', address: '5678 Oak Ave', status: 'Completed' },
  ]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const [listings, setListings] = useState([
    { id: 1, image: images.houseHeader, price: '$450,000', address: '123 Elm St' },
    { id: 2, image: images.houseHeader, price: '$500,000', address: '456 Oak Ave' },
  ]);

  const [leads] = useState([
    { name: 'Aryan Mantrawadi', contact: 'aryan@gmail.com', status: 'New Lead' },
    { name: 'Bob Thompson', contact: 'bob@gmail.com', status: 'Contacted' },
  ]);

  const handleConfirmDate = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]; // e.g., "2024-11-15"
    setNewAppointment({ ...newAppointment, date: formattedDate, status: 'Upcoming' });
    setDatePickerVisible(false);
  };

  const handleConfirmTime = (time: Date) => {
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // e.g., "2:00 PM"
    setNewAppointment({ ...newAppointment, time: formattedTime });
    setTimePickerVisible(false);
  };

  const handleAddAppointment = () => {
    setAppointments([...appointments, newAppointment]);
    setNewAppointment({ clientName: '', date: '', time: '', address: '', status: 'Upcoming' });
    setIsModalVisible(false);
  };

  const handleEditAppointment = (index: number) => {
    const appointment = appointments[index];
    setNewAppointment(appointment);
    setIsModalVisible(true);
    setAppointments(appointments.filter((_, i) => i !== index)); // remove original before edit
  };

  const handleDeleteAppointment = (index: number) => {
    setAppointments(appointments.filter((_, i) => i !== index));
  };

  const handleAddListing = () => {
    setListings([...listings, { ...newListing, id: listings.length + 1 }]);
    setNewListing({ image: '', price: '', address: '', description: '' });
    setIsListingModalVisible(false);
  };

interface Lead {
  status: string; 
  contact: string;
  name: string; 
}

const handleFollowUp = (lead: Lead) => {
  if (lead.status === 'New Lead') {
    const emailBody = `Hi ${lead.name}, I would like to follow up regarding your interest in our listings.`;
    const emailSubject = 'Follow Up';

    const emailUrl = `mailto:${lead.contact}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Attempt to open the default email client
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(emailUrl).catch((err) =>
            console.error('Error opening email client:', err)
          );
        } else {
          Alert.alert(
            'Email Not Configured',
            'No email client is set up on your device.'
          );
        }
      })
      .catch((err) =>
        console.error('Error checking email client availability:', err)
      );
  } else {
    console.log('Lead status is not "New Lead", cannot follow up.');
  }
};


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, Realtor!</Text>
        <Text style={styles.headerSubText}>
          Manage your listings, leads, and appointments here.
        </Text>
      </View>

      {/* Dashboard Section */}
      <View style={styles.dashboard}>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardItemText}>Active Listings</Text>
          <Text style={styles.dashboardItemCount}>{listings.length}</Text>
        </View>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardItemText}>Leads</Text>
          <Text style={styles.dashboardItemCount}>{leads.length}</Text>
        </View>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardItemText}>Appointments</Text>
          <Text style={styles.dashboardItemCount}>{appointments.length}</Text>
        </View>
      </View>
            {/* Active Listings Section */}
            <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Active Listings</Text>
          <TouchableOpacity onPress={() => setIsListingModalVisible(true)}>
            <Ionicons name="add-circle-outline" size={24} color="#0286FF" />
          </TouchableOpacity>
        </View>

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
              source={images.houseHeader}
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

      {/* Modal to Add/Edit Listing */}
      <ScrollView>
      <Modal visible={isListingModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Listing Price"
            value={newListing.price}
            onChangeText={(text) => setNewListing({ ...newListing, price: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Listing Address"
            value={newListing.address}
            onChangeText={(text) => setNewListing({ ...newListing, address: text })}
          />
            <TextInput
            style={styles.input}
            placeholder="Listing Description"
            value={newListing.address}
            onChangeText={(text) => setNewListing({ ...newListing, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={newListing.image}
            onChangeText={(text) => setNewListing({ ...newListing, image: text })}
          />
          <View style={styles.modalButtons}>
            <Button title="Save Listing" onPress={handleAddListing} />
            <Button title="Cancel" onPress={() => setIsListingModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>

      {/* Leads Section */}
      <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Leads</Text>
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
            onPress={() => handleFollowUp(lead)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Follow Up</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>

      {/* Appointments Section */}
      <View style={{ padding: 20 }}>
        <View style={styles.sectionHeader}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Upcoming Appointments</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#0286FF" />
          </TouchableOpacity>
        </View>

        {/* Add ScrollView here */}
        <ScrollView style={{ marginTop: 10 }}>
          <FlatList
            data={appointments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.appointmentCard}>
                <Text style={{fontSize: 18, fontWeight: 'bold' }}>{item.clientName}</Text>
                <Text style={styles.appointmentText}>{item.date}</Text>
                <Text style={styles.appointmentText}>{item.time}</Text>
                <Text style={styles.appointmentText}>{item.address}</Text>
                <Text
                  style={[
                    styles.appointmentStatus,
                    { color: item.status === 'Upcoming' ? '#28a745' : '#ff9800' },
                  ]}
                >
                  {item.status}
                </Text>
                <View style={styles.appointmentActions}>
                  <TouchableOpacity onPress={() => handleEditAppointment(index)}>
                    <Text style={styles.appointmentActionText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteAppointment(index)}>
                    <Text style={styles.appointmentActionText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>

      {/* Modal to Add/Edit Appointment */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Client Name"
            value={newAppointment.clientName}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, clientName: text })}
            
          />
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <Text style={styles.input}>{newAppointment.date || 'Select Date'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
      />
          <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
            <Text style={styles.input}>{newAppointment.time || 'Select Time'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisible(false)}
      />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={newAppointment.address}
            onChangeText={(text) => setNewAppointment({ ...newAppointment, address: text })}
          />
          <View style={styles.modalButtons}>
            <Button title="Save Appointment" onPress={handleAddAppointment} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0286FF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubText: {
    color: '#fff',
    fontSize: 16,
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dashboardItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '30%',
    alignItems: 'center',
  },
  dashboardItemText: {
    fontSize: 12,
    fontWeight:'bold'
  },
  dashboardItemCount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  appointmentText: {
    fontSize: 16,
    color: '#333',
  },
  appointmentStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  appointmentActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  appointmentActionText: {
    color: '#0286FF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RealtorHomePage;
