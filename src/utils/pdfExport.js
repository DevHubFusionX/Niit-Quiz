import jsPDF from 'jspdf';

export const exportToPDF = (results, subject) => {
  try {
    // Validate inputs
    if (!results || typeof results !== 'object') {
      throw new Error('Invalid results data');
    }
    
    if (!subject || typeof subject !== 'string') {
      throw new Error('Invalid subject name');
    }

    const doc = new jsPDF();
    
    // Safely set title
    try {
      doc.setFontSize(20);
      const title = `${subject.substring(0, 50)} Quiz Results`; // Limit title length
      doc.text(title, 20, 30);
    } catch (error) {
      console.error('Error setting PDF title:', error);
      doc.text('Quiz Results', 20, 30);
    }
    
    // Safely add basic info
    try {
      doc.setFontSize(12);
      const score = results.score || 0;
      const total = results.total || 0;
      const percentage = results.percentage || 0;
      const timeTaken = results.timeTaken || 'Unknown';
      
      doc.text(`Score: ${score}/${total} (${percentage}%)`, 20, 50);
      doc.text(`Time Taken: ${timeTaken}`, 20, 60);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
    } catch (error) {
      console.error('Error adding basic info to PDF:', error);
    }
    
    let yPosition = 90;
    doc.text('Incorrect Answers:', 20, yPosition);
    yPosition += 10;
    
    // Safely process incorrect answers
    const incorrectAnswers = Array.isArray(results.incorrectAnswers) ? results.incorrectAnswers : [];
    
    incorrectAnswers.forEach((item, index) => {
      try {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        const question = item?.question ? item.question.substring(0, 100) : 'Question not available';
        const userAnswer = item?.userAnswer || 'No answer';
        const correctAnswer = item?.correctAnswer || 'Answer not available';
        
        doc.text(`${index + 1}. ${question}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Your answer: ${userAnswer}`, 25, yPosition);
        yPosition += 10;
        doc.text(`Correct answer: ${correctAnswer}`, 25, yPosition);
        yPosition += 15;
      } catch (error) {
        console.error('Error processing incorrect answer:', error);
        yPosition += 15; // Skip this item but continue
      }
    });
    
    // Safely save the PDF
    try {
      const filename = `${subject.replace(/[^a-zA-Z0-9]/g, '_')}_quiz_results.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error('Error saving PDF:', error);
      doc.save('quiz_results.pdf'); // Fallback filename
    }
    
  } catch (error) {
    console.error('Failed to export PDF:', error);
    alert('Failed to export PDF. Please try again.');
  }
};