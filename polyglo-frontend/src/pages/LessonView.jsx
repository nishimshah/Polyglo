// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { lessonsService } from '../services/lessons';
// import { ArrowLeft, PlayCircle, CheckCircle, Clock } from 'lucide-react';
// import Header from '../components/common/Header';
// import Loading from '../components/common/Loading';
// import toast from 'react-hot-toast';

// const LessonView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [lesson, setLesson] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [completing, setCompleting] = useState(false);
//   const [startTime] = useState(Date.now());

//   useEffect(() => {
//     fetchLesson();
//   }, [id]);

//   const fetchLesson = async () => {
//     try {
//       const response = await lessonsService.getLessonById(id);
//       setLesson(response.data);
//     } catch (error) {
//       toast.error('Failed to load lesson');
//       navigate('/courses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompleteLesson = async () => {
//     if (completing || lesson.is_completed) return;

//     setCompleting(true);
//     const timeSpent = Math.round((Date.now() - startTime) / (1000 * 60)); // Convert to minutes

//     try {
//       const response = await lessonsService.completeLesson(id, timeSpent);
//       setLesson(prev => ({ ...prev, is_completed: true }));
//       toast.success(`${response.data.message} +${response.data.xp_earned} XP!`);
//     } catch (error) {
//       toast.error('Failed to complete lesson');
//     } finally {
//       setCompleting(false);
//     }
//   };

//   if (loading) return <Loading />;

//   if (!lesson) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-6 py-8">
//           <div className="text-center">
//             <p className="text-gray-600">Lesson not found</p>
//             <button 
//               onClick={() => navigate('/courses')}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Back to Courses
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       <div className="container mx-auto px-6 py-8">
//         {/* Navigation */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Course
//           </button>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {/* Lesson Header */}
//           <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
//                 <p className="text-gray-600">{lesson.description}</p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center text-gray-500">
//                   <Clock className="w-5 h-5 mr-1" />
//                   <span>{lesson.duration_minutes} min</span>
//                 </div>
//                 {lesson.is_completed && (
//                   <div className="flex items-center text-green-600">
//                     <CheckCircle className="w-5 h-5 mr-1" />
//                     <span>Completed</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Lesson Type Badge */}
//             <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//               {lesson.lesson_type.charAt(0).toUpperCase() + lesson.lesson_type.slice(1)} Lesson
//             </div>
//           </div>

//           {/* Lesson Content */}
//           <div className="bg-white rounded-xl shadow-md p-8 mb-8">
//             {/* Audio Player */}
//             {lesson.audio_file && (
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio Lesson</h3>
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <audio controls className="w-full">
//                     <source src={lesson.audio_file} type="audio/mpeg" />
//                     Your browser does not support the audio element.
//                   </audio>
//                 </div>
//               </div>
//             )}

//             {/* Video Player */}
//             {lesson.video_file && (
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Lesson</h3>
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <video controls className="w-full rounded-lg">
//                     <source src={lesson.video_file} type="video/mp4" />
//                     Your browser does not support the video element.
//                   </video>
//                 </div>
//               </div>
//             )}

//             {/* Text Content */}
//             {lesson.content && (
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content</h3>
//                 <div className="prose max-w-none">
//                   <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                     {lesson.content}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Transcript */}
//             {lesson.transcript && (
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h3>
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                     {lesson.transcript}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="text-gray-600">
//                   <span className="font-medium">XP Reward:</span> {lesson.xp_reward} points
//                 </div>
//                 {lesson.is_premium && (
//                   <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
//                     Premium
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center space-x-4">
//                 {!lesson.is_completed ? (
//                   <button
//                     onClick={handleCompleteLesson}
//                     disabled={completing}
//                     className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <CheckCircle className="w-5 h-5" />
//                     <span>{completing ? 'Completing...' : 'Complete Lesson'}</span>
//                   </button>
//                 ) : (
//                   <div className="flex items-center text-green-600 font-medium">
//                     <CheckCircle className="w-5 h-5 mr-2" />
//                     Lesson Completed!
//                   </div>
//                 )}

//                 <button
//                   onClick={() => navigate(`/courses/${lesson.course}/lessons`)}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   Back to Course
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LessonView;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsService } from '../services/lessons';
import { ArrowLeft, PlayCircle, CheckCircle, Clock } from 'lucide-react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [startTime] = useState(Date.now());

  // ✅ ADD: Inline styles for interactive lessons
  const lessonStyles = {
    interactiveLesson: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    },
    lessonSection: {
      background: '#f8f9fa',
      padding: '25px',
      margin: '20px 0',
      borderRadius: '15px',
      borderLeft: '5px solid #007bff'
    },
    vocabularyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      margin: '15px 0'
    },
    vocabItem: {
      background: 'white',
      padding: '15px',
      borderRadius: '10px',
      border: '2px solid #e9ecef',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    numbersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '10px',
      margin: '20px 0'
    },
    numberCard: {
      background: '#e9ecef',
      padding: '12px',
      borderRadius: '8px',
      textAlign: 'center',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    familyVocab: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '15px',
      margin: '15px 0'
    },
    familyItem: {
      background: 'white',
      padding: '15px',
      borderRadius: '10px',
      border: '2px solid #e9ecef',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    interactiveQuestion: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '25px',
      margin: '25px 0',
      borderRadius: '15px',
      color: 'white'
    },
    questionOptions: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      margin: '15px 0'
    },
    optionBtn: {
      background: 'white',
      color: '#333',
      border: '2px solid transparent',
      padding: '12px 24px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      fontSize: '16px'
    },
    dialogueBox: {
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      borderLeft: '5px solid #17a2b8',
      margin: '15px 0',
      color: '#333'
    },
    exampleSentences: {
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      color: '#333',
      margin: '15px 0'
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [id]);

  useEffect(() => {
    // ✅ ADD: Load interactive functionality after lesson content is rendered
    if (lesson && lesson.lesson_type === 'interactive') {
      loadInteractiveJS();
    }
  }, [lesson]);

  const fetchLesson = async () => {
    try {
      const response = await lessonsService.getLessonById(id);
      setLesson(response.data);
    } catch (error) {
      toast.error('Failed to load lesson');
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD: Interactive lesson functionality
  const loadInteractiveJS = () => {
    setTimeout(() => {
      // Handle multiple choice questions
      document.querySelectorAll('.interactive-question[data-type="multiple-choice"]').forEach(question => {
        const buttons = question.querySelectorAll('.option-btn');
        const correctAnswer = question.querySelector('.correct-answer')?.value;
        
        buttons.forEach(btn => {
          // Remove existing event listeners
          btn.replaceWith(btn.cloneNode(true));
        });
        
        // Re-get buttons after cloning
        question.querySelectorAll('.option-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const allButtons = question.querySelectorAll('.option-btn');
            allButtons.forEach(b => {
              b.classList.remove('selected', 'correct', 'incorrect');
              b.style.background = 'white';
              b.style.borderColor = 'transparent';
              b.style.color = '#333';
            });
            
            this.classList.add('selected');
            const userAnswer = this.getAttribute('data-value');
            const feedback = question.querySelector('.question-feedback');
            
            if (userAnswer === correctAnswer) {
              this.classList.add('correct');
              this.style.background = '#d4edda';
              this.style.borderColor = '#28a745';
              this.style.color = '#155724';
              if (feedback) {
                feedback.querySelector('.correct-feedback').style.display = 'block';
                feedback.querySelector('.incorrect-feedback').style.display = 'none';
                feedback.style.display = 'block';
              }
              showXPNotification(5);
            } else {
              this.classList.add('incorrect');
              this.style.background = '#f8d7da';
              this.style.borderColor = '#dc3545';
              this.style.color = '#721c24';
              if (feedback) {
                feedback.querySelector('.correct-feedback').style.display = 'none';
                feedback.querySelector('.incorrect-feedback').style.display = 'block';
                feedback.style.display = 'block';
              }
            }
          });
        });
      });

      // Handle true/false questions
      document.querySelectorAll('.interactive-question[data-type="true-false"]').forEach(question => {
        const buttons = question.querySelectorAll('.option-btn');
        const correctAnswer = question.querySelector('.correct-answer')?.value;
        
        buttons.forEach(btn => {
          btn.replaceWith(btn.cloneNode(true));
        });
        
        question.querySelectorAll('.option-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            const allButtons = question.querySelectorAll('.option-btn');
            allButtons.forEach(b => {
              b.classList.remove('selected', 'correct', 'incorrect');
              b.style.background = 'white';
              b.style.borderColor = 'transparent';
              b.style.color = '#333';
            });
            
            this.classList.add('selected');
            const userAnswer = this.getAttribute('data-value');
            const feedback = question.querySelector('.question-feedback');
            
            if (userAnswer === correctAnswer) {
              this.classList.add('correct');
              this.style.background = '#d4edda';
              this.style.borderColor = '#28a745';
              this.style.color = '#155724';
              if (feedback) {
                feedback.querySelector('.correct-feedback').style.display = 'block';
                feedback.querySelector('.incorrect-feedback').style.display = 'none';
                feedback.style.display = 'block';
              }
              showXPNotification(5);
            } else {
              this.classList.add('incorrect');
              this.style.background = '#f8d7da';
              this.style.borderColor = '#dc3545';
              this.style.color = '#721c24';
              if (feedback) {
                feedback.querySelector('.correct-feedback').style.display = 'none';
                feedback.querySelector('.incorrect-feedback').style.display = 'block';
                feedback.style.display = 'block';
              }
            }
          });
        });
      });

      // Handle fill-in-the-blank questions
      document.querySelectorAll('.interactive-question[data-type="fill-blank"]').forEach(question => {
        const input = question.querySelector('.fill-blank-input');
        const checkBtn = question.querySelector('.check-answer-btn');
        const correctAnswer = question.querySelector('.correct-answer')?.value?.toLowerCase();
        
        if (checkBtn) {
          checkBtn.replaceWith(checkBtn.cloneNode(true));
          const newCheckBtn = question.querySelector('.check-answer-btn');
          
          newCheckBtn.addEventListener('click', function() {
            const userAnswer = input?.value?.toLowerCase()?.trim();
            const feedback = question.querySelector('.question-feedback');
            
            if (userAnswer === correctAnswer) {
              input.style.borderColor = '#28a745';
              input.style.backgroundColor = '#d4edda';
              if (feedback) {
                feedback.querySelector('.correct-feedback').style.display = 'block';
                feedback.querySelector('.incorrect-feedback').style.display = 'none';
                feedback.style.display = 'block';
              }
              showXPNotification(8);
            } else {
              input.style.borderColor = '#dc3545';
              input.style.backgroundColor = '#f8d7da';
              if (feedback) {
                feedback.querySelector('.correct-feedback').style.display = 'none';
                feedback.querySelector('.incorrect-feedback').style.display = 'block';
                feedback.style.display = 'block';
              }
            }
          });
        }
      });
    }, 100);
  };

  // ✅ ADD: XP notification function
  const showXPNotification = (xp) => {
    const notification = document.createElement('div');
    notification.innerHTML = `+${xp} XP!`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 16px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    if (!document.head.querySelector('style[data-xp-animation]')) {
      style.setAttribute('data-xp-animation', 'true');
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  const handleCompleteLesson = async () => {
    if (completing || lesson.is_completed) return;

    setCompleting(true);
    const timeSpent = Math.round((Date.now() - startTime) / (1000 * 60));

    try {
      const response = await lessonsService.completeLesson(id, timeSpent);
      setLesson(prev => ({ ...prev, is_completed: true }));
      toast.success(`${response.data.message} +${response.data.xp_earned} XP!`);
    } catch (error) {
      toast.error('Failed to complete lesson');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) return <Loading />;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600">Lesson not found</p>
            <button 
              onClick={() => navigate('/courses')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Course
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Lesson Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                <p className="text-gray-600">{lesson.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{lesson.duration_minutes} min</span>
                </div>
                {lesson.is_completed && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Type Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {lesson.lesson_type.charAt(0).toUpperCase() + lesson.lesson_type.slice(1)} Lesson
            </div>
          </div>

          {/* Lesson Content */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            {/* Audio Player */}
            {lesson.audio_file && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio Lesson</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <audio controls className="w-full">
                    <source src={lesson.audio_file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            )}

            {/* Video Player */}
            {lesson.video_file && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Lesson</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <video controls className="w-full rounded-lg">
                    <source src={lesson.video_file} type="video/mp4" />
                    Your browser does not support the video element.
                  </video>
                </div>
              </div>
            )}

            {/* ✅ FIXED: Interactive Content Rendering */}
            {lesson.content && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content</h3>
                {lesson.lesson_type === 'interactive' ? (
                  // ✅ Render interactive lessons with HTML and apply styles
                  <div 
                    style={lessonStyles.interactiveLesson}
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                  />
                ) : (
                  // Regular text content for non-interactive lessons
                  <div className="prose max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {lesson.content}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Transcript */}
            {lesson.transcript && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {lesson.transcript}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-gray-600">
                  <span className="font-medium">XP Reward:</span> {lesson.xp_reward} points
                </div>
                {lesson.is_premium && (
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Premium
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {!lesson.is_completed ? (
                  <button
                    onClick={handleCompleteLesson}
                    disabled={completing}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{completing ? 'Completing...' : 'Complete Lesson'}</span>
                  </button>
                ) : (
                  <div className="flex items-center text-green-600 font-medium">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Lesson Completed!
                  </div>
                )}

                <button
                  onClick={() => navigate(`/courses/${lesson.course}/lessons`)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Back to Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
