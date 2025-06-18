import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// Individual Comment Component
const CommentBox = ({ comment, onDelete, onReply, onSubmitReply }) => {
  const [replyInput, setReplyInput] = useState('');

  const handleReplySubmit = () => {
    if (replyInput.trim() !== '') {
      onSubmitReply(replyInput);
      setReplyInput('');
    }
  };

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentBox}>
        <Text style={styles.commentText}>{comment}</Text>
      </View>
      <View style={styles.commentActions}>
        <TouchableOpacity style={styles.buttonContainer}>
          <TouchableOpacity style={styles.replyButton} onPress={onReply}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.replyInput}
        placeholder="Type your reply..."
        value={replyInput}
        onChangeText={setReplyInput}
        onSubmitEditing={handleReplySubmit}
      />
    </View>
  );
};

// Image Item Component
const ImageItem = ({ source, postedBy, likeIcon, onLikePress, onCommentPress, comments, onDeleteComment, onReplyComment, onSubmitReply }) => (
  <View style={styles.imageContainer}>
    <View style={styles.imageWrapper}>
      <Image source={source} style={styles.image} resizeMode="contain" />
      <Text style={styles.postedBy}>Posted By {postedBy}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onLikePress} style={styles.actionButton}>
          <Image source={likeIcon} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCommentPress} style={styles.actionButton}>
          <Image source={require('./Buttons/conversation.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
      {comments.map((comment, index) => (
        <CommentBox
          key={`${source}-${index}`}
          comment={comment}
          onDelete={() => onDeleteComment(index)}
          onReply={() => onReplyComment(index)}
          onSubmitReply={(reply) => onSubmitReply(index, reply)} // Pass index and reply to onSubmitReply
        />
      ))}
    </View>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const nav = useNavigation(); // Initialize useNavigation hook

  // State variables
  const [likeIcons, setLikeIcons] = useState([
    require('./Buttons/heart.png'),
    require('./Buttons/heart.png'),
    require('./Buttons/heart.png'),
    require('./Buttons/heart.png'),
  ]);
  const [comments, setComments] = useState([[], [], [], []]);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [imageData, setImageData] = useState([
    { source: require('./POSTS/post1.jpeg'), postedBy: 'Agra Tourism' },
    { source: require('./POSTS/post2.jpeg'), postedBy: 'Bombay Lobby' },
    { source: require('./POSTS/post3.jpeg'), postedBy: 'Foodainia' },
    { source: require('./POSTS/post4.jpeg'), postedBy: 'Docat' },
  ]);

  // Handlers
  const toggleLikeIcon = (index) => {
    setLikeIcons(prevIcons => {
      const newIcons = [...prevIcons];
      newIcons[index] = newIcons[index] === require('./Buttons/heart.png') ? require('./Buttons/heart (1).png') : require('./Buttons/heart.png');
      return newIcons;
    });
  };

  const addComment = () => {
    if (selectedImageIndex !== null) {
      const updatedComments = [...comments];
      updatedComments[selectedImageIndex] = [...updatedComments[selectedImageIndex], commentInput.trim()];
      setComments(updatedComments);
      setCommentInput('');
      setModalVisible(false);
    }
  };

  const onDeleteComment = (commentIndex) => {
    const updatedComments = [...comments];
    updatedComments[selectedImageIndex].splice(commentIndex, 1);
    setComments(updatedComments);
  };

  const onReplyComment = (commentIndex) => {
    // Open reply modal or perform any other action for replying to the comment
    console.log('Replying to comment:', comments[selectedImageIndex][commentIndex]);
  };

  const onSubmitReply = (commentIndex, reply) => {
    const updatedComments = [...comments];
    updatedComments[selectedImageIndex][commentIndex] += `\nReply: ${reply}`;
    setComments(updatedComments);
  };

  const handleNewPost = () => {
    nav.navigate('NewPost'); // Navigate to NewPost screen
  };

  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.scrollView, { paddingTop: 12 }]}>

        {imageData.map((item, index) => (
          <ImageItem
            key={index}
            source={item.source}
            postedBy={item.postedBy}
            likeIcon={likeIcons[index]}
            onLikePress={() => toggleLikeIcon(index)}
            onCommentPress={() => { setModalVisible(true); setSelectedImageIndex(index); }}
            comments={comments[index]}
            onDeleteComment={onDeleteComment}
            onReplyComment={onReplyComment}
            onSubmitReply={onSubmitReply} // Pass onSubmitReply to the ImageItem component
          />
        ))}
      </ScrollView>
      {/* Comment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentInput}
              onChangeText={setCommentInput}
              multiline={true}
            />
            <TouchableOpacity onPress={addComment} style={styles.modalButton}>
              <Text style={styles.buttonText}>Add Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Footer */}
      <View style={styles.footer}>
        {/* Non-functional search button */}
        <TouchableOpacity>
  <Image source={require('./Buttons/home (1).png')} style={styles.actionIcon} />
</TouchableOpacity>
        <TouchableOpacity onPress={navigateToSearch}>
          <Image source={require('./Buttons/search.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        {/* Other buttons */}
        <TouchableOpacity onPress={handleNewPost}>
          <Image source={require('./Buttons/picture.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToNotifications}>
          <Image source={require('./Buttons/bell.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfile}>
          <Image source={require('./Buttons/account.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  postedBy: {
    color: 'white',
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
  comments: {
    color: 'white',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  commentInput: {
    backgroundColor: '#E0E0E0',
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  commentBox: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 5,
    width: 290,
  },
  commentText: {
    color: 'black',
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 5,
  },
  buttonContainer: {
    marginRight: 10,
  },
  replyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  replyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  replyInput: {
    backgroundColor: '#E0E0E0',
    width: 270,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default HomeScreen;
