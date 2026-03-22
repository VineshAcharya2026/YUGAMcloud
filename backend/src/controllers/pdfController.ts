import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

export const generatePayslip = async (req: Request, res: Response) => {
  try {
    const { employeeId, month, year } = req.body;
    // Mock data for example
    const salary = 55000;
    const hra = salary * 0.4;
    
    const doc = new PDFDocument({ margin: 50 });
    
    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Payslip_${employeeId}_${month}_${year}.pdf`);
    doc.pipe(res);
    
    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('YUGAMCLOUD.ai', { align: 'center' });
    doc.fontSize(12).font('Helvetica').text('Salary Slip', { align: 'center' });
    doc.moveDown();
    
    // Employee Info
    doc.fontSize(12).text(`Employee ID: ${employeeId}`);
    doc.text(`Month/Year: ${month} ${year}`);
    doc.moveDown();
    
    // Salary Breakdown Table
    doc.rect(50, doc.y, 500, 20).fillAndStroke('#f3f4f6', '#e5e7eb');
    doc.fillColor('#000').text('Earnings', 60, doc.y - 15);
    doc.text('Amount (INR)', 400, doc.y - 15);
    
    doc.moveDown();
    doc.text('Basic Salary', 60, doc.y);
    doc.text(`${salary}`, 400, doc.y);
    doc.text('HRA', 60, doc.y + 20);
    doc.text(`${hra}`, 400, doc.y);
    
    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};
