import React from 'react';
import { useNavigate } from 'react-router-dom';

function Presentaion() {
    const nav = useNavigate();

    const demoslides = [
        {
            "slideNo": 1,
            "templateName": "T1",
            "heading": "AI Revolutionizing Education",
            "subheading": "Reshaping Learning and Teaching",
            "description": "Artificial intelligence is rapidly transforming the education sector, offering personalized learning experiences, automating tasks, and opening new avenues for both educators and students."
        },
        {
            "slideNo": 2,
            "templateName": "T3",
            "heading": "Benefits and Challenges of AI in Education",
            "topic1": "Benefits",
            "points1": [
                "Personalized learning pathways tailored to individual student needs.",
                "Automated grading and feedback systems, freeing up educators' time.",
                "Enhanced accessibility for students with disabilities.",
                "24/7 access to learning resources and support."
            ],
            "topic2": "Challenges",
            "points2": [
                "Ensuring data privacy and security.",
                "Addressing the digital divide and equitable access to technology.",
                "Maintaining the human element in education.",
                "Developing robust and reliable AI algorithms."
            ]
        },
        {
            "slideNo": 3,
            "templateName": "T2",
            "heading": "Personalized Learning with AI",
            "points": [
                "Adaptive learning platforms adjust to student pace and learning style.",
                "Intelligent tutoring systems provide personalized guidance and support.",
                "AI-powered recommendations for relevant learning resources.",
                "Gamified learning experiences enhance engagement and motivation."
            ],
            "image": "example/personalizedlearning.jpg"
        },
        {
            "slideNo": 4,
            "templateName": "T4",
            "heading": "The Future of Education with AI",
            "topic": "Emerging Opportunities",
            "points": [
                "AI-powered virtual and augmented reality learning environments.",
                "Predictive analytics to identify at-risk students and provide early intervention.",
                "Globalized and interconnected learning communities.",
                "Lifelong learning and personalized reskilling opportunities."
            ]
        },
        {
            "slideNo": 5,
            "templateName": "T5",
            "heading": "Embracing the AI-Driven Future of Education",
            "image": "example/futureofeducation.jpg",
            "imageTitle": "AI-powered classroom of the future"
        }
    ];

    return (
        <div>
            {demoslides.map((slide, index) => (
                <div key={index} className="slide">
                    <h2>{slide.heading}</h2>
                    {slide.subheading && <h4>{slide.subheading}</h4>}
                    {slide.description && <p>{slide.description}</p>}

                    {/* T2 and T4 types: display points */}
                    {slide.points && (
                        <ul>
                            {slide.points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    )}

                    {/* T3: Benefits and Challenges */}
                    {slide.templateName === "T3" && (
                        <div>
                            <h3>{slide.topic1}</h3>
                            <ul>
                                {slide.points1.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                            <h3>{slide.topic2}</h3>
                            <ul>
                                {slide.points2.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Image-based slides */}
                    {slide.image && (
                        <div>
                            <img src={slide.image} alt={slide.imageTitle || slide.heading} />
                            {slide.imageTitle && <p>{slide.imageTitle}</p>}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Presentaion;
