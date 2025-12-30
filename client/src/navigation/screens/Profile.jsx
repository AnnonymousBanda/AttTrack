import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

const DUMMY_USER = {
  userID: 'user_123',
  name: 'Ankit Bhagat',
  roll: '2301CE03',
  email: 'ankit_2301ce03@iitp.ac.in',
  branch: 'Civil Engineering',
  batch: '2023-2027',
  semester: '4',
  profilePicture: 'https://avatar.iran.liara.run/public/boy',
};

const DUMMY_COURSES = [
  { courseCode: 'CS101', courseName: 'Intro to Programming', present: 17, absent: 2, medical: 1 },
  { courseCode: 'MA201', courseName: 'Mathematics II', present: 13, absent: 7, medical: 0 },
  { courseCode: 'PH102', courseName: 'Physics', present: 19, absent: 1, medical: 0 },
];

export function Profile() {
  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(DUMMY_USER);
  
  const [courses, setCourses] = useState(DUMMY_COURSES);
  const [originalCourses, setOriginalCourses] = useState(JSON.parse(JSON.stringify(DUMMY_COURSES)));

  const [isEditingSem, setIsEditingSem] = useState(false);
  const [tempSemester, setTempSemester] = useState(user.semester);
  const [editingCourseCode, setEditingCourseCode] = useState(null);

  const updateSemesterAPI = async (userID, newSemester) => {
    return new Promise(resolve => setTimeout(() => resolve({ status: 200 }), 1000));
  };

  const updateAttendanceAPI = async (userID, semester, courseCode, data) => {
    return new Promise(resolve => setTimeout(() => resolve({ status: 200 }), 1000));
  };

  const handleUpdateSemester = async () => {
    setLoading(true);
    try {
      const res = await updateSemesterAPI(user.userID, tempSemester);
      
      if (res.status === 200) {
        setUser(prev => ({ ...prev, semester: tempSemester }));
        setIsEditingSem(false);
        Alert.alert("Success", "Semester updated");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update semester");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAttendance = async (courseCode) => {
    const course = courses.find(c => c.courseCode === courseCode);
    if (!course) return;

    try {
      const payload = {
        present: Number(course.present),
        absent: Number(course.absent),
        medical: Number(course.medical)
      };

      const res = await updateAttendanceAPI(user.userID, user.semester, courseCode, payload);

      if (res.status === 200) {
        const updatedOriginals = originalCourses.map(c => 
          c.courseCode === courseCode ? { ...course } : c
        );
        setOriginalCourses(updatedOriginals);
        setEditingCourseCode(null);
        Alert.alert("Success", "Course attendance saved");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save");
    }
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      for (const course of courses) {
        const original = originalCourses.find(o => o.courseCode === course.courseCode);
        
        if (
          Number(course.present) !== Number(original.present) || 
          Number(course.absent) !== Number(original.absent) || 
          Number(course.medical) !== Number(original.medical)
        ) {
          await updateAttendanceAPI(user.userID, user.semester, course.courseCode, {
            present: Number(course.present),
            absent: Number(course.absent),
            medical: Number(course.medical)
          });
        }
      }
      
      setOriginalCourses(JSON.parse(JSON.stringify(courses)));
      Alert.alert("Success", "All courses saved");
    } catch (error) {
      Alert.alert("Error", "Failed to save all");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseInputChange = (index, field, value) => {
    const num = value.replace(/[^0-9]/g, '');
    setCourses(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: num };
      return copy;
    });
  };

  const cancelEditCourse = (courseCode) => {
    const original = originalCourses.find(c => c.courseCode === courseCode);
    if (original) {
      setCourses(prev => prev.map(c => c.courseCode === courseCode ? { ...original } : c));
    }
    setEditingCourseCode(null);
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: 'destructive', onPress: () => console.log("Logging out...") }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <FontAwesome5 name="user-circle" size={22} color="#333" />
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
           <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.profileSection}>
          <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userDetail}>{user.roll}</Text>
            <Text style={styles.userDetail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          
          <View style={styles.infoCard}>
            <MaterialIcons name="class" size={32} color="#555" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Branch</Text>
              <Text style={styles.infoValue}>{user.branch}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="school" size={32} color="#555" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Batch</Text>
              <Text style={styles.infoValue}>{user.batch}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="calendar" size={32} color="#555" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Semester</Text>
              {isEditingSem ? (
                <TextInput 
                  style={styles.semInput}
                  value={tempSemester}
                  onChangeText={setTempSemester}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ) : (
                <Text style={styles.infoValue}>{user.semester}</Text>
              )}
            </View>
            
            <View style={styles.actionButtons}>
              {isEditingSem ? (
                 <>
                   <TouchableOpacity onPress={() => setIsEditingSem(false)} style={styles.cancelBtnSmall}>
                     <Text style={styles.btnTextSmall}>Cancel</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={handleUpdateSemester} style={styles.saveBtnSmall}>
                     <Text style={styles.btnTextSmall}>Save</Text>
                   </TouchableOpacity>
                 </>
              ) : (
                <TouchableOpacity onPress={() => { setTempSemester(user.semester); setIsEditingSem(true); }} style={styles.editBtn}>
                   <MaterialIcons name="edit" size={22} color="#333" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.coursesContainer}>
             <View style={styles.courseHeader}>
               <Feather name="book-open" size={24} color="#333" />
               <Text style={styles.courseHeaderTitle}>Courses</Text>
             </View>

             {loading ? (
               <ActivityIndicator size="large" color="#4BC0C0" style={{ marginVertical: 20 }} />
             ) : (
               <View style={styles.courseList}>
                 {courses.map((item, index) => {
                   const isEditing = editingCourseCode === item.courseCode;
                   
                   return (
                     <View key={item.courseCode} style={styles.courseCard}>
                       
                       <View style={styles.courseTopRow}>
                          <TouchableOpacity 
                            disabled={isEditing || editingCourseCode !== null}
                            onPress={() => setEditingCourseCode(item.courseCode)}
                            style={[styles.editIconBtn, (editingCourseCode !== null && !isEditing) && { opacity: 0.3 }]}
                          >
                             <MaterialIcons name="edit" size={18} color="#fff" />
                          </TouchableOpacity>
                          <View style={{ flex: 1, marginLeft: 10 }}>
                             <Text style={styles.courseCode}>{item.courseCode}</Text>
                             <Text style={styles.courseName}>{item.courseName}</Text>
                          </View>
                       </View>

                       <View style={styles.statsRow}>
                          <View style={styles.statCol}>
                            <Text style={styles.statLabel}>P</Text>
                            {isEditing ? (
                              <TextInput 
                                style={styles.statInput} 
                                value={String(item.present)} 
                                onChangeText={(v) => handleCourseInputChange(index, 'present', v)}
                                keyboardType="numeric" 
                              />
                            ) : (
                              <Text style={styles.statValue}>{item.present}</Text>
                            )}
                          </View>

                          <View style={styles.statCol}>
                            <Text style={styles.statLabel}>A</Text>
                            {isEditing ? (
                              <TextInput 
                                style={styles.statInput} 
                                value={String(item.absent)} 
                                onChangeText={(v) => handleCourseInputChange(index, 'absent', v)}
                                keyboardType="numeric" 
                              />
                            ) : (
                              <Text style={styles.statValue}>{item.absent}</Text>
                            )}
                          </View>

                          <View style={styles.statCol}>
                            <Text style={styles.statLabel}>M</Text>
                            {isEditing ? (
                              <TextInput 
                                style={styles.statInput} 
                                value={String(item.medical)} 
                                onChangeText={(v) => handleCourseInputChange(index, 'medical', v)}
                                keyboardType="numeric" 
                              />
                            ) : (
                              <Text style={styles.statValue}>{item.medical}</Text>
                            )}
                          </View>
                       </View>

                       {isEditing && (
                         <View style={styles.courseActions}>
                           <TouchableOpacity onPress={() => cancelEditCourse(item.courseCode)} style={styles.cancelBtnSmall}>
                             <Text style={styles.btnTextSmall}>Cancel</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={() => handleUpdateAttendance(item.courseCode)} style={styles.saveBtnSmall}>
                             <Text style={styles.btnTextSmall}>Save</Text>
                           </TouchableOpacity>
                         </View>
                       )}
                     </View>
                   );
                 })}

                 <TouchableOpacity 
                   style={styles.saveAllBtn} 
                   onPress={handleSaveAll}
                   disabled={loading}
                 >
                   <Text style={styles.saveAllText}>Save all</Text>
                 </TouchableOpacity>

               </View>
             )}
          </View>

          <View style={styles.footer}>
             <TouchableOpacity 
                style={styles.bugReportBtn}
                onPress={() => Linking.openURL('https://forms.gle/DjoRKfTt6NNjepzU9')}
             >
                <MaterialIcons name="bug-report" size={24} color="#1f2937" />
                <Text style={styles.footerBtnText}>Report a bug</Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color="#7f1d1d" />
                <Text style={[styles.footerBtnText, { color: '#7f1d1d' }]}>Logout</Text>
             </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    gap: 20,
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  userDetail: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '400',
    marginTop: 2,
  },
  detailsContainer: {
    width: '90%',
    gap: 15,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#d7e4ee',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontWeight: '600',
    fontSize: 15,
    color: '#1f2937',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
  },
  semInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    width: 60,
    textAlign: 'center',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
  },
  coursesContainer: {
    backgroundColor: '#d7e4ee',
    padding: 16,
    borderRadius: 12,
  },
  courseHeader: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  courseHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  courseList: {
    gap: 12,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    gap: 10,
  },
  courseTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  editIconBtn: {
    backgroundColor: '#1f2937',
    padding: 6,
    borderRadius: 6,
    marginTop: 2,
  },
  courseCode: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1f2937',
  },
  courseName: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  statCol: {
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontWeight: '600',
    fontSize: 14,
    color: '#374151',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  statInput: {
    backgroundColor: '#f3f4f6',
    width: 45,
    textAlign: 'center',
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  courseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  cancelBtnSmall: {
    backgroundColor: '#ff6384',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  saveBtnSmall: {
    backgroundColor: '#4bc0c0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnTextSmall: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  saveAllBtn: {
    backgroundColor: '#1f2937',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveAllText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  footer: {
    backgroundColor: '#d7e4ee',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 20,
  },
  bugReportBtn: {
    backgroundColor: '#1f2937',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    gap: 12,
    justifyContent: 'center'
  },
  logoutBtn: {
    backgroundColor: '#ff6384',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    gap: 12,
    justifyContent: 'center'
  },
  footerBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    textTransform: 'capitalize',
  },
});
