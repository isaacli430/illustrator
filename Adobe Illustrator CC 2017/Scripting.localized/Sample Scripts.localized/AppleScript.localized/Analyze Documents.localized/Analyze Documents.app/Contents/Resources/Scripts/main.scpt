FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2005-2008 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior 
written permission of Adobe. 

********************************************************     � 	 	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 
 A D O B E   S Y S T E M S   I N C O R P O R A T E D   
 C o p y r i g h t   2 0 0 5 - 2 0 0 8   A d o b e   S y s t e m s   I n c o r p o r a t e d   
 A l l   R i g h t s   R e s e r v e d   
 
 N O T I C E :     A d o b e   p e r m i t s   y o u   t o   u s e ,   m o d i f y ,   a n d   
 d i s t r i b u t e   t h i s   f i l e   i n   a c c o r d a n c e   w i t h   t h e   t e r m s 
 o f   t h e   A d o b e   l i c e n s e   a g r e e m e n t   a c c o m p a n y i n g   i t .     
 I f   y o u   h a v e   r e c e i v e d   t h i s   f i l e   f r o m   a   s o u r c e   
 o t h e r   t h a n   A d o b e ,   t h e n   y o u r   u s e ,   m o d i f i c a t i o n , 
 o r   d i s t r i b u t i o n   o f   i t   r e q u i r e s   t h e   p r i o r   
 w r i t t e n   p e r m i s s i o n   o f   A d o b e .   
 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   
  
 l     ��������  ��  ��        l      ��  ��    � �*******************************************************************************
	Main is invoked if the user double clicks on the application
*******************************************************************************     �  � * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 M a i n   i s   i n v o k e d   i f   t h e   u s e r   d o u b l e   c l i c k s   o n   t h e   a p p l i c a t i o n 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *      i         I     ������
�� .aevtoappnull  �   � ****��  ��    k            r         I    ������
�� .sysostflalis    ��� null��  ��    o      ����  0 documentfolder documentFolder   ��  I    �� ���� 0 analyzefolder AnalyzeFolder   ��  o   	 
����  0 documentfolder documentFolder��  ��  ��        l     ��������  ��  ��         l      �� ! "��   !*******************************************************************************
	The "open" method is invoked if the script is saved as an application
	and if a folder is dropped on the script
*******************************************************************************    " � # #  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 T h e   " o p e n "   m e t h o d   i s   i n v o k e d   i f   t h e   s c r i p t   i s   s a v e d   a s   a n   a p p l i c a t i o n 
 	 a n d   i f   a   f o l d e r   i s   d r o p p e d   o n   t h e   s c r i p t 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *    $ % $ i     & ' & I     �� (��
�� .aevtodocnull  �    alis ( o      ���� 0 theitems  ��   ' k      ) )  * + * l     �� , -��   , ] W	First preflight the input parameter, which should be a list containing a single folder    - � . . � 	 F i r s t   p r e f l i g h t   t h e   i n p u t   p a r a m e t e r ,   w h i c h   s h o u l d   b e   a   l i s t   c o n t a i n i n g   a   s i n g l e   f o l d e r +  / 0 / r      1 2 1 I     �� 3���� 60 validatesinglefolderinput ValidateSingleFolderInput 3  4�� 4 o    ���� 0 theitems  ��  ��   2 o      ����  0 documentfolder documentFolder 0  5�� 5 I   	 �� 6���� 0 analyzefolder AnalyzeFolder 6  7�� 7 o   
 ����  0 documentfolder documentFolder��  ��  ��   %  8 9 8 l     ��������  ��  ��   9  : ; : l      �� < =��   < � �*******************************************************************************
	AnalyzeFolder
	analyzes all the documents in a given folder
*******************************************************************************    = � > >� * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 A n a l y z e F o l d e r 
 	 a n a l y z e s   a l l   t h e   d o c u m e n t s   i n   a   g i v e n   f o l d e r 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ;  ? @ ? i    A B A I      �� C���� 0 analyzefolder AnalyzeFolder C  D�� D o      ����  0 documentfolder documentFolder��  ��   B k     E E  F G F l     �� H I��   H a [local documentFontList, documentGradientList, documentSpotColorList, documentPlacedItemList    I � J J � l o c a l   d o c u m e n t F o n t L i s t ,   d o c u m e n t G r a d i e n t L i s t ,   d o c u m e n t S p o t C o l o r L i s t ,   d o c u m e n t P l a c e d I t e m L i s t G  K L K r      M N M J     ����   N o      ���� $0 documentfontlist documentFontList L  O P O r    	 Q R Q J    ����   R o      ���� ,0 documentgradientlist documentGradientList P  S T S r   
  U V U J   
 ����   V o      ���� .0 documentspotcolorlist documentSpotColorList T  W X W r     Y Z Y J    ����   Z o      ���� 00 documentplaceditemlist documentPlacedItemList X  [ \ [ l   ��������  ��  ��   \  ] ^ ] l   �� _ `��   _ P J Don't allow to run generator if there are open documents. This is because    ` � a a �   D o n ' t   a l l o w   t o   r u n   g e n e r a t o r   i f   t h e r e   a r e   o p e n   d o c u m e n t s .   T h i s   i s   b e c a u s e ^  b c b l   �� d e��   d V P the generator close the scanned documents without saving, and we don't want to     e � f f �   t h e   g e n e r a t o r   c l o s e   t h e   s c a n n e d   d o c u m e n t s   w i t h o u t   s a v i n g ,   a n d   w e   d o n ' t   w a n t   t o   c  g h g l   �� i j��   i   throw away user changes    j � k k 0   t h r o w   a w a y   u s e r   c h a n g e s h  l m l O    " n o n r    ! p q p I   �� r��
�� .corecnte****       **** r 2   ��
�� 
docu��   q o      ���� 0 
mydoccount 
myDocCount o m     s s                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��   m  t u t Z   # I v w���� v l  # & x���� x ?   # & y z y o   # $���� 0 
mydoccount 
myDocCount z m   $ %����  ��  ��   w k   ) E { {  | } | I  ) .�� ~��
�� .miscactvnull��� ��� null ~  f   ) *��   }   �  I  / 4������
�� .sysobeepnull��� ��� long��  ��   �  � � � I  5 B�� � �
�� .sysodlogaskr        TEXT � m   5 6 � � � � � � P l e a s e   c l o s e   a l l   o p e n   d o c u m e n t s   b e f o r e   r u n n i n g   t h e   f o n t   r e p o r t   g e n e r a t o r � �� � �
�� 
btns � J   7 : � �  ��� � m   7 8 � � � � �  O K��   � �� � �
�� 
dflt � m   ; <����  � �� ���
�� 
disp � m   = >����  ��   �  ��� � L   C E����  ��  ��  ��   u  � � � l  J J��������  ��  ��   �  � � � l  J J�� � ���   � % 	Bring Illustrator to the front    � � � � > 	 B r i n g   I l l u s t r a t o r   t o   t h e   f r o n t �  � � � O  J T � � � I  N S������
�� .miscactvnull��� ��� null��  ��   � m   J K � �                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��   �  � � � l  U U��������  ��  ��   �  � � � l  U U�� � ���   � 0 *	Iterate over the documents in the folder.    � � � � T 	 I t e r a t e   o v e r   t h e   d o c u m e n t s   i n   t h e   f o l d e r . �  � � � r   U ] � � � I   U [�� ����� 00 getaliaslistfromfinder GetAliasListFromFinder �  ��� � o   V W����  0 documentfolder documentFolder��  ��   � o      ���� 0 documentfilelist   �  � � � r   ^ e � � � I  ^ c�� ���
�� .corecnte****       **** � o   ^ _���� 0 documentfilelist  ��   � o      ���� 0 documentcount documentCount �  � � � l  f f��������  ��  ��   �  � � � l  f f�� � ���   � + % Make a document to outout results to    � � � � J   M a k e   a   d o c u m e n t   t o   o u t o u t   r e s u l t s   t o �  � � � r   f i � � � m   f g � � � � � & D o c u m e n t R e p o r t e r . a i � o      ���� 0 reportername reporterName �  � � � O   j � � � � k   n � � �  � � � r   n � � � � I  n ����� �
�� .corecrel****      � null��   � �� � �
�� 
kocl � m   p q��
�� 
docu � �� ���
�� 
prdt � K   r z � � �� ���
�� 
caCS � m   u x��
�� eCLSeRbM��  ��   � o      ����  0 reporterdocref reporterDocRef �  � � � I  � ��� � �
�� .coresavedocu       docu � o   � �����  0 reporterdocref reporterDocRef � �� ���
�� 
kfil � 4   � ��� �
�� 
file � o   � ����� 0 reportername reporterName��   �  ��� � r   � � � � � n   � � � � � 1   � ���
�� 
pSHh � o   � �����  0 reporterdocref reporterDocRef � o      ��  0 documentheight documentHeight��   � m   j k � �                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��   �  � � � l  � ��~�}�|�~  �}  �|   �  � � � r   � � � � � \   � � � � � o   � ��{�{  0 documentheight documentHeight � m   � ��z�z 2 � o      �y�y 0 topedge topEdge �  � � � l  � ��x�w�v�x  �w  �v   �  � � � l  � ��u � ��u   �   Now open each document	    � � � � 0   N o w   o p e n   e a c h   d o c u m e n t 	 �  � � � Y   � ��t � ��s � k   �
 � �  � � � r   � � � � � n   � � � � � 4   � ��r �
�r 
cobj � o   � ��q�q 0 i   � o   � ��p�p 0 documentfilelist   � o      �o�o 0 documentfile documentFile �  � � � l  � ��n�m�l�n  �m  �l   �  � � � O   � � � � � k   � � � �  � � � I  � ��k ��j
�k .aevtodocnull  �    alis � o   � ��i�i 0 documentfile documentFile�j   �  ��h � r   � � � � � n   � �   1   � ��g
�g 
pnam 1   � ��f
�f 
aiAD � o      �e�e  0 mydocumentname myDocumentName�h   � m   � �                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��   �  l  � ��d�c�b�d  �c  �b    l  � ��a�a   Q K Analyze the document that was opened for the various pieces of information    �		 �   A n a l y z e   t h e   d o c u m e n t   t h a t   w a s   o p e n e d   f o r   t h e   v a r i o u s   p i e c e s   o f   i n f o r m a t i o n 

 r   � � b   � � o   � ��`�` $0 documentfontlist documentFontList I   � ��_�^�_ ,0 analyzedocumentfonts AnalyzeDocumentFonts �] o   � ��\�\  0 mydocumentname myDocumentName�]  �^   o      �[�[ $0 documentfontlist documentFontList  r   � � I   � ��Z�Y�Z 40 analyzedocumentgradients AnalyzeDocumentGradients  o   � ��X�X  0 mydocumentname myDocumentName �W o   � ��V�V ,0 documentgradientlist documentGradientList�W  �Y   o      �U�U ,0 documentgradientlist documentGradientList  r   � � I   � ��T�S�T 60 analyzedocumentspotcolors AnalyzeDocumentSpotColors   o   � ��R�R  0 mydocumentname myDocumentName  !�Q! o   � ��P�P .0 documentspotcolorlist documentSpotColorList�Q  �S   o      �O�O .0 documentspotcolorlist documentSpotColorList "#" r   � �$%$ I   � ��N&�M�N 80 analyzedocumentplaceditems AnalyzeDocumentPlacedItems& '(' o   � ��L�L  0 mydocumentname myDocumentName( )�K) o   � ��J�J 00 documentplaceditemlist documentPlacedItemList�K  �M  % o      �I�I 00 documentplaceditemlist documentPlacedItemList# *+* l  � ��H�G�F�H  �G  �F  + ,-, O   �./. I  ��E01
�E .coreclosnull���    docu0 1   � ��D
�D 
aiAD1 �C2�B
�C 
savo2 m  �A
�A boovfals�B  / m   � �33                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  - 4�@4 l 		�?�>�=�?  �>  �=  �@  �t 0 i   � m   � ��<�<  � o   � ��;�; 0 documentcount documentCount�s   � 565 l �:�9�8�:  �9  �8  6 787 I  �79�6�7 00 generatedocumentreport GenerateDocumentReport9 :;: o  �5�5 0 reportername reporterName; <=< o  �4�4 0 topedge topEdge= >?> o  �3�3 $0 documentfontlist documentFontList? @A@ l 	B�2�1B o  �0�0 ,0 documentgradientlist documentGradientList�2  �1  A CDC o  �/�/ 00 documentplaceditemlist documentPlacedItemListD E�.E o  �-�- .0 documentspotcolorlist documentSpotColorList�.  �6  8 F�,F l �+�*�)�+  �*  �)  �,   @ GHG l     �(�'�&�(  �'  �&  H IJI l     �%�$�#�%  �$  �#  J KLK l      �"MN�"  M � �*******************************************************************************
	GenerateDocumentReport initiates generation of all other reports
*******************************************************************************   N �OO� * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 G e n e r a t e D o c u m e n t R e p o r t   i n i t i a t e s   g e n e r a t i o n   o f   a l l   o t h e r   r e p o r t s 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *L PQP i   RSR I      �!T� �! 00 generatedocumentreport GenerateDocumentReportT UVU o      �� "0 docreportername docReporterNameV WXW o      �� 0 topedge topEdgeX YZY o      �� 0 docfontlist docFontListZ [\[ o      �� "0 docgradientlist docGradientList\ ]^] o      �� &0 docplaceditemlist docPlacedItemList^ _�_ o      �� $0 docspotcolorlist docSpotColorList�  �   S k     l`` aba r     cdc m     ��d o      �� 0 leftedge leftEdgeb efe r    ghg m    �� h o      �� 0 lineleading lineLeadingf iji r    klk m    	�� l o      �� 0 textgap textGapj mnm O    5opo k    4qq rsr r    tut 4    �v
� 
docuv o    �� "0 docreportername docReporterNameu o      �� 0 docref docRefs wxw l   ����  �  �  x yzy l   �{|�  { . ( Write the heading and the document name   | �}} P   W r i t e   t h e   h e a d i n g   a n d   t h e   d o c u m e n t   n a m ez ~~ r    ,��� I   *��
�
� .corecrel****      � null�
  � �	��
�	 
kocl� n   ��� m    �
� 
cTXa� o    �� 0 docref docRef� ���
� 
prdt� K    &�� ���
� 
pCNT� m    �� ���  D O C U M E N T   R E P O R T� ���
� 
paPs� J     $�� ��� m     !�� 2� �� � o   ! "���� 0 topedge topEdge�   �  �  � o      ���� *0 documentheadingline documentHeadingLine ���� r   - 4��� m   - .�� @,      � n      ��� 1   1 3��
�� 
ptsz� n   . 1��� m   / 1��
�� 
ctxt� o   . /���� *0 documentheadingline documentHeadingLine��  p m    ��                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  n ��� l  6 6��������  ��  ��  � ��� r   6 =��� \   6 ;��� o   6 7���� 0 topedge topEdge� l  7 :������ ]   7 :��� o   7 8���� 0 lineleading lineLeading� m   8 9���� ��  ��  � o      ���� 0 topedge topEdge� ��� r   > H��� I   > F������� (0 generatefontreport GenerateFontReport� ��� o   ? @���� "0 docreportername docReporterName� ��� o   @ A���� 0 docfontlist docFontList� ���� o   A B���� 0 topedge topEdge��  ��  � o      ���� 0 topedge topEdge� ��� r   I S��� I   I Q������� 00 generategradientreport GenerateGradientReport� ��� o   J K���� "0 docreportername docReporterName� ��� o   K L���� "0 docgradientlist docGradientList� ���� o   L M���� 0 topedge topEdge��  ��  � o      ���� 0 topedge topEdge� ��� r   T ^��� I   T \������� 20 generatespotcolorreport GenerateSpotColorReport� ��� o   U V���� "0 docreportername docReporterName� ��� o   V W���� $0 docspotcolorlist docSpotColorList� ���� o   W X���� 0 topedge topEdge��  ��  � o      ���� 0 topedge topEdge� ��� r   _ i��� I   _ g������� 40 generateplaceditemreport GeneratePlacedItemReport� ��� o   ` a���� "0 docreportername docReporterName� ��� o   a b���� &0 docplaceditemlist docPlacedItemList� ���� o   b c���� 0 topedge topEdge��  ��  � o      ���� 0 topedge topEdge� ��� l  j j��������  ��  ��  � ���� L   j l�� o   j k���� 0 topedge topEdge��  Q ��� l     ��������  ��  ��  � ��� l      ������  � � �*******************************************************************************
	Generate Font Report
*******************************************************************************   � ���j * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 G e n e r a t e   F o n t   R e p o r t 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *� ��� i   ��� I      ������� (0 generatefontreport GenerateFontReport� ��� o      ���� "0 docreportername docReporterName� ��� o      ���� 0 fontlist fontList� ���� o      ���� 0 topedge topEdge��  ��  � k     ��� ��� r     ��� m     ���� � o      ���� 0 lineleading lineLeading� ��� r    ��� m    ���� � o      ���� 0 textgap textGap� ��� l   ��������  ��  ��  � ��� O    ���� k    ��� ��� r    ��� 4    ���
�� 
docu� o    ���� "0 docreportername docReporterName� o      ���� 0 docref docRef� ��� l   ��������  ��  ��  � ��� r    ��� n    ��� 1    ��
�� 
pSHw� o    ���� 0 docref docRef� o      ���� 0 documentwidth documentWidth�    r      \     l   ���� ^     o    ���� 0 documentwidth documentWidth m    ���� ��  ��   m    ���� 
 o      ���� 0 leftedge leftEdge 	
	 l  ! !��������  ��  ��  
  r   ! ( I  ! &����
�� .corecnte****       **** o   ! "���� 0 fontlist fontList��   o      ���� 0 	fontcount 	fontCount  r   ) J I  ) H����
�� .corecrel****      � null��   ��
�� 
kocl n  + . m   , .��
�� 
cTXa o   + ,���� 0 docref docRef ����
�� 
prdt K   / B ��
�� 
pCNT b   0 9 b   0 7  b   0 3!"! m   0 1## �$$  F O N T S  " m   1 2%% �&&  (    l  3 6'����' c   3 6()( o   3 4���� 0 	fontcount 	fontCount) m   4 5��
�� 
ctxt��  ��   m   7 8** �++    ) ��,��
�� 
paPs, J   : >-- ./. m   : ;���� K/ 0��0 o   ; <���� 0 topedge topEdge��  ��  ��   o      ���� "0 fontheadingline fontHeadingLine 121 r   K V343 m   K N55 @0      4 n      676 1   Q U��
�� 
ptsz7 n   N Q898 m   O Q��
�� 
ctxt9 o   N O���� "0 fontheadingline fontHeadingLine2 :;: l  W W��������  ��  ��  ; <=< r   W \>?> \   W Z@A@ o   W X���� 0 topedge topEdgeA o   X Y���� 0 lineleading lineLeading? o      ���� 0 topedge topEdge= BCB l  ] ]��������  ��  ��  C DED X   ] �F��GF k   o �HH IJI l  o o��KL��  K - ' Create the first name & right align it   L �MM N   C r e a t e   t h e   f i r s t   n a m e   &   r i g h t   a l i g n   i tJ NON r   o �PQP I  o �����R
�� .corecrel****      � null��  R ��ST
�� 
koclS n  q tUVU m   r t��
�� 
cTXaV o   q r���� 0 docref docRefT ��W��
�� 
prdtW K   u �XX ��YZ
�� 
pCNTY o   v w���� 0 fontname fontNameZ �[�~
� 
paPs[ J   x |\\ ]^] o   x y�}�} 0 leftedge leftEdge^ _�|_ o   y z�{�{ 0 topedge topEdge�|  �~  ��  Q o      �z�z 0 fontnameline fontNameLineO `a` r   � �bcb m   � ��y
�y eTBae123c n      ded 1   � ��x
�x 
pT16e n  � �fgf 4   � ��wh
�w 
cparh m   � ��v�v g o   � ��u�u 0 fontnameline fontNameLinea iji l  � ��t�s�r�t  �s  �r  j klk l  � ��qmn�q  m 3 - Create the second name with the font applied   n �oo Z   C r e a t e   t h e   s e c o n d   n a m e   w i t h   t h e   f o n t   a p p l i e dl pqp r   � �rsr I  � ��p�ot
�p .corecrel****      � null�o  t �nuv
�n 
koclu n  � �wxw m   � ��m
�m 
cTXax o   � ��l�l 0 docref docRefv �ky�j
�k 
prdty K   � �zz �i{|
�i 
pCNT{ o   � ��h�h 0 fontname fontName| �g}�f
�g 
paPs} J   � �~~ � [   � ���� l  � ���e�d� ^   � ���� o   � ��c�c 0 documentwidth documentWidth� m   � ��b�b �e  �d  � m   � ��a�a 
� ��`� o   � ��_�_ 0 topedge topEdge�`  �f  �j  s o      �^�^ 0 fontnameline fontNameLineq ��� r   � ���� 4   � ��]�
�] 
cTXf� o   � ��\�\ 0 fontname fontName� n      ��� m   � ��[
�[ 
cTXf� n   � ���� m   � ��Z
�Z 
ctxt� o   � ��Y�Y 0 fontnameline fontNameLine� ��� l  � ��X�W�V�X  �W  �V  � ��� l  � ��U���U  � @ : Make sure that the next font line goes below the previous   � ��� t   M a k e   s u r e   t h a t   t h e   n e x t   f o n t   l i n e   g o e s   b e l o w   t h e   p r e v i o u s� ��T� r   � ���� \   � ���� o   � ��S�S 0 topedge topEdge� o   � ��R�R 0 lineleading lineLeading� o      �Q�Q 0 topedge topEdge�T  �� 0 fontname fontNameG o   ` a�P�P 0 fontlist fontListE ��� l  � ��O�N�M�O  �N  �M  � ��� l  � ��L���L  � L F after the report is done, add a little more space for the next report   � ��� �   a f t e r   t h e   r e p o r t   i s   d o n e ,   a d d   a   l i t t l e   m o r e   s p a c e   f o r   t h e   n e x t   r e p o r t� ��� r   � ���� \   � ���� o   � ��K�K 0 topedge topEdge� o   � ��J�J 0 lineleading lineLeading� o      �I�I 0 topedge topEdge� ��H� l  � ��G�F�E�G  �F  �E  �H  � m    	��                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  � ��� L   � ��� o   � ��D�D 0 topedge topEdge� ��C� l  � ��B�A�@�B  �A  �@  �C  � ��� l     �?�>�=�?  �>  �=  � ��� l      �<���<  � � �*******************************************************************************
	Generate Gradient Report
*******************************************************************************   � ���r * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 G e n e r a t e   G r a d i e n t   R e p o r t 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *� ��� i   ��� I      �;��:�; 00 generategradientreport GenerateGradientReport� ��� o      �9�9 "0 docreportername docReporterName� ��� o      �8�8 0 gradientlist gradientList� ��7� o      �6�6 0 topedge topEdge�7  �:  � k     ��� ��� r     ��� m     �5�5 � o      �4�4 0 lineleading lineLeading� ��� r    ��� m    �3�3 � o      �2�2 0 textgap textGap� ��� l   �1�0�/�1  �0  �/  � ��� O    ���� k    ��� ��� r    ��� 4    �.�
�. 
docu� o    �-�- "0 docreportername docReporterName� o      �,�, 0 docref docRef� ��� r    ��� n    ��� 1    �+
�+ 
pSHw� o    �*�* 0 docref docRef� o      �)�) 0 documentwidth documentWidth� ��� r     ��� \    ��� l   ��(�'� ^    ��� o    �&�& 0 documentwidth documentWidth� m    �%�% �(  �'  � m    �$�$ 
� o      �#�# 0 leftedge leftEdge� ��� r   ! (��� I  ! &�"��!
�" .corecnte****       ****� o   ! "� �  0 gradientlist gradientList�!  � o      �� 0 gradientcount gradientCount� ��� r   ) J��� I  ) H���
� .corecrel****      � null�  � ���
� 
kocl� n  + .��� m   , .�
� 
cTXa� o   + ,�� 0 docref docRef� ���
� 
prdt� K   / B�� ���
� 
pCNT� b   0 9��� b   0 7��� b   0 3��� m   0 1�� ���  G R A D I E N T S� m   1 2�� ���  (  � l  3 6 ��  c   3 6 o   3 4�� 0 gradientcount gradientCount m   4 5�
� 
ctxt�  �  � m   7 8 �    )� ��
� 
paPs J   : >  m   : ;�� K 	�	 o   ; <�� 0 topedge topEdge�  �  �  � o      �� "0 gradientheading gradientHeading� 

 r   K V m   K N @0       n       1   Q U�
� 
ptsz n   N Q m   O Q�
� 
ctxt o   N O�
�
 "0 gradientheading gradientHeading  r   W \ \   W Z o   W X�	�	 0 topedge topEdge o   X Y�� 0 lineleading lineLeading o      �� 0 topedge topEdge  l  ] ]����  �  �    X   ] �� k   o �  !  l  o o�"#�  " ' ! Create the name & right align it   # �$$ B   C r e a t e   t h e   n a m e   &   r i g h t   a l i g n   i t! %&% r   o �'(' I  o ��� )
� .corecrel****      � null�   ) ��*+
�� 
kocl* n  q t,-, m   r t��
�� 
cTXa- o   q r���� 0 docref docRef+ ��.��
�� 
prdt. K   u �// ��01
�� 
pCNT0 o   v w���� 0 gradientname gradientName1 ��2��
�� 
paPs2 J   x |33 454 o   x y���� 0 leftedge leftEdge5 6��6 o   y z���� 0 topedge topEdge��  ��  ��  ( o      ���� $0 gradientnameline gradientNameLine& 787 r   � �9:9 m   � ���
�� eTBae123: n      ;<; 1   � ���
�� 
pT16< n  � �=>= 4   � ���?
�� 
cpar? m   � ����� > o   � ����� $0 gradientnameline gradientNameLine8 @A@ l  � ���������  ��  ��  A BCB l  � ���DE��  D D > Make sure that the next gradient line goes below the previous   E �FF |   M a k e   s u r e   t h a t   t h e   n e x t   g r a d i e n t   l i n e   g o e s   b e l o w   t h e   p r e v i o u sC G��G r   � �HIH \   � �JKJ o   � ����� 0 topedge topEdgeK o   � ����� 0 lineleading lineLeadingI o      ���� 0 topedge topEdge��  � 0 gradientname gradientName o   ` a���� 0 gradientlist gradientList LML l  � ���������  ��  ��  M NON l  � ���PQ��  P L F after the report is done, add a little more space for the next report   Q �RR �   a f t e r   t h e   r e p o r t   i s   d o n e ,   a d d   a   l i t t l e   m o r e   s p a c e   f o r   t h e   n e x t   r e p o r tO S��S r   � �TUT \   � �VWV o   � ����� 0 topedge topEdgeW o   � ����� 0 lineleading lineLeadingU o      ���� 0 topedge topEdge��  � m    	XX                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  � Y��Y L   � �ZZ o   � ����� 0 topedge topEdge��  � [\[ l     ��������  ��  ��  \ ]^] l     ��������  ��  ��  ^ _`_ l      ��ab��  a � �*******************************************************************************
	Generate SpotColor Report
*******************************************************************************   b �cct * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 G e n e r a t e   S p o t C o l o r   R e p o r t 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *` ded i   fgf I      ��h���� 20 generatespotcolorreport GenerateSpotColorReporth iji o      ���� "0 docreportername docReporterNamej klk o      ���� 0 thelist theListl m��m o      ���� 0 topedge topEdge��  ��  g k     �nn opo r     qrq m     ���� r o      ���� 0 lineleading lineLeadingp sts r    uvu m    ���� v o      ���� 0 textgap textGapt wxw l   ��������  ��  ��  x yzy O    �{|{ k    �}} ~~ r    ��� 4    ���
�� 
docu� o    ���� "0 docreportername docReporterName� o      ���� 0 docref docRef ��� r    ��� n    ��� 1    ��
�� 
pSHw� o    ���� 0 docref docRef� o      ���� 0 documentwidth documentWidth� ��� r     ��� \    ��� l   ������ ^    ��� o    ���� 0 documentwidth documentWidth� m    ���� ��  ��  � m    ���� 
� o      ���� 0 leftedge leftEdge� ��� r   ! (��� I  ! &�����
�� .corecnte****       ****� o   ! "���� 0 thelist theList��  � o      ���� 0 	listcount 	listCount� ��� l  ) )��������  ��  ��  � ��� r   ) J��� I  ) H�����
�� .corecrel****      � null��  � ����
�� 
kocl� n  + .��� m   , .��
�� 
cTXa� o   + ,���� 0 docref docRef� �����
�� 
prdt� K   / B�� ����
�� 
pCNT� b   0 9��� b   0 7��� b   0 3��� m   0 1�� ���  S P O T   C O L O R S� m   1 2�� ���  (  � l  3 6������ c   3 6��� o   3 4���� 0 	listcount 	listCount� m   4 5��
�� 
ctxt��  ��  � m   7 8�� ���    )� �����
�� 
paPs� J   : >�� ��� m   : ;���� K� ���� o   ; <���� 0 topedge topEdge��  ��  ��  � o      ���� 0 spotheading spotHeading� ��� r   K V��� m   K N�� @0      � n      ��� 1   Q U��
�� 
ptsz� n   N Q��� m   O Q��
�� 
ctxt� o   N O���� 0 spotheading spotHeading� ��� l  W W��������  ��  ��  � ��� r   W \��� \   W Z��� o   W X���� 0 topedge topEdge� o   X Y���� 0 lineleading lineLeading� o      ���� 0 topedge topEdge� ��� l  ] ]��������  ��  ��  � ��� X   ] ������ k   o ��� ��� l  o o������  � - ' Create the first name & right align it   � ��� N   C r e a t e   t h e   f i r s t   n a m e   &   r i g h t   a l i g n   i t� ��� r   o ���� I  o ������
�� .corecrel****      � null��  � ����
�� 
kocl� n  q t��� m   r t��
�� 
cTXa� o   q r���� 0 docref docRef� �����
�� 
prdt� K   u ��� ����
�� 
pCNT� o   v w���� 0 spotname spotName� �����
�� 
paPs� J   x |�� ��� o   x y���� 0 leftedge leftEdge� ���� o   y z���� 0 topedge topEdge��  ��  ��  � o      ���� 0 nameline nameLine� ��� r   � ���� m   � ���
�� eTBae123� n      ��� 1   � ���
�� 
pT16� n  � ���� 4   � ����
�� 
cpar� m   � ����� � o   � ����� 0 nameline nameLine� ��� l  � ���~�}�  �~  �}  � ��� l  � ��|���|  � D > Make sure that the next gradient line goes below the previous   � ��� |   M a k e   s u r e   t h a t   t h e   n e x t   g r a d i e n t   l i n e   g o e s   b e l o w   t h e   p r e v i o u s� ��{� r   � ���� \   � ���� o   � ��z�z 0 topedge topEdge� o   � ��y�y 0 lineleading lineLeading� o      �x�x 0 topedge topEdge�{  �� 0 spotname spotName� o   ` a�w�w 0 thelist theList� ��� l  � ��v�u�t�v  �u  �t  �    l  � ��s�s   L F after the report is done, add a little more space for the next report    � �   a f t e r   t h e   r e p o r t   i s   d o n e ,   a d d   a   l i t t l e   m o r e   s p a c e   f o r   t h e   n e x t   r e p o r t �r r   � � \   � �	 o   � ��q�q 0 topedge topEdge	 o   � ��p�p 0 lineleading lineLeading o      �o�o 0 topedge topEdge�r  | m    	

                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  z  l  � ��n�m�l�n  �m  �l    L   � � o   � ��k�k 0 topedge topEdge �j l  � ��i�h�g�i  �h  �g  �j  e  l     �f�e�d�f  �e  �d    l     �c�b�a�c  �b  �a    l      �`�`   � �*******************************************************************************
	Generate PlacedItem Report
*******************************************************************************    �v * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 G e n e r a t e   P l a c e d I t e m   R e p o r t 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  i    I      �_�^�_ 40 generateplaceditemreport GeneratePlacedItemReport   o      �]�] "0 docreportername docReporterName  !"! o      �\�\  0 placeditemlist placedItemList" #�[# o      �Z�Z 0 topedge topEdge�[  �^   k     �$$ %&% r     '(' m     �Y�Y d( o      �X�X 0 leftedge leftEdge& )*) r    +,+ m    �W�W , o      �V�V 0 lineleading lineLeading* -.- r    /0/ m    	�U�U 0 o      �T�T 0 textgap textGap. 121 l   �S�R�Q�S  �R  �Q  2 343 O    �565 k    �77 898 r    :;: 4    �P<
�P 
docu< o    �O�O "0 docreportername docReporterName; o      �N�N 0 docref docRef9 =>= r    ?@? I   �MA�L
�M .corecnte****       ****A o    �K�K  0 placeditemlist placedItemList�L  @ o      �J�J "0 placeditemcount placedItemCount> BCB r    <DED I   :�I�HF
�I .corecrel****      � null�H  F �GGH
�G 
koclG n  ! $IJI m   " $�F
�F 
cTXaJ o   ! "�E�E 0 docref docRefH �DK�C
�D 
prdtK K   % 6LL �BMN
�B 
pCNTM b   & /OPO b   & -QRQ b   & )STS m   & 'UU �VV  P L A C E D   I T E M ST m   ' (WW �XX  (  R l  ) ,Y�A�@Y c   ) ,Z[Z o   ) *�?�? "0 placeditemcount placedItemCount[ m   * +�>
�> 
ctxt�A  �@  P m   - .\\ �]]    )N �=^�<
�= 
paPs^ J   0 4__ `a` m   0 1�;�; Ka b�:b o   1 2�9�9 0 topedge topEdge�:  �<  �C  E o      �8�8 &0 placeditemheading placedItemHeadingC cdc r   = Hefe m   = @gg @0      f n      hih 1   C G�7
�7 
ptszi n   @ Cjkj m   A C�6
�6 
ctxtk o   @ A�5�5 &0 placeditemheading placedItemHeadingd lml r   I Nnon \   I Lpqp o   I J�4�4 0 topedge topEdgeq o   J K�3�3 0 lineleading lineLeadingo o      �2�2 0 topedge topEdgem rsr l  O O�1�0�/�1  �0  �/  s tut X   O �v�.wv k   a �xx yzy r   a h{|{ c   a f}~} o   a b�-�- 0 placeditemref placedItemRef~ m   b e�,
�, 
TEXT| o      �+�+  0 placeditempath placedItemPathz �* Z   i ����)�(� l  i n��'�&� >  i n��� o   i j�%�%  0 placeditempath placedItemPath� m   j m�� ���  �'  �&  � k   q ��� ��� r   q ���� I  q ��$�#�
�$ .corecrel****      � null�#  � �"��
�" 
kocl� n  s v��� m   t v�!
�! 
cTXa� o   s t� �  0 docref docRef� ���
� 
prdt� K   w ��� ���
� 
pCNT� o   x y��  0 placeditempath placedItemPath� ���
� 
paPs� J   z ~�� ��� o   z {�� 0 leftedge leftEdge� ��� o   { |�� 0 topedge topEdge�  �  �  � o      �� (0 placeditemnameline placedItemNameLine� ��� r   � ���� m   � ��
� eTBae121� n      ��� 1   � ��
� 
pT16� n  � ���� 4   � ���
� 
cpar� m   � ��� � o   � ��� (0 placeditemnameline placedItemNameLine� ��� l  � �����  �  �  � ��� l  � �����  � G A Make sure that the next placed item line goes below the previous   � ��� �   M a k e   s u r e   t h a t   t h e   n e x t   p l a c e d   i t e m   l i n e   g o e s   b e l o w   t h e   p r e v i o u s� ��� r   � ���� \   � ���� o   � ��� 0 topedge topEdge� o   � ��
�
 0 lineleading lineLeading� o      �	�	 0 topedge topEdge�  �)  �(  �*  �. 0 placeditemref placedItemRefw o   R S��  0 placeditemlist placedItemListu ��� l  � �����  �  �  � ��� l  � �����  � L F after the report is done, add a little more space for the next report   � ��� �   a f t e r   t h e   r e p o r t   i s   d o n e ,   a d d   a   l i t t l e   m o r e   s p a c e   f o r   t h e   n e x t   r e p o r t� ��� r   � ���� \   � ���� o   � ��� 0 topedge topEdge� o   � ��� 0 lineleading lineLeading� o      � �  0 topedge topEdge�  6 m    ��                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  4 ��� l  � ���������  ��  ��  � ��� L   � ��� o   � ����� 0 topedge topEdge� ���� l  � ���������  ��  ��  ��   ��� l     ��������  ��  ��  � ��� l     ��������  ��  ��  � ��� l      ������  � � �*******************************************************************************
	Analyze the contents of a single document
*******************************************************************************   � ���� * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 A n a l y z e   t h e   c o n t e n t s   o f   a   s i n g l e   d o c u m e n t 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *� ��� i    #��� I      ������� 80 analyzedocumentplaceditems AnalyzeDocumentPlacedItems� ��� o      ���� 0 documentfile documentFile� ���� o      ���� *0 totalplaceditemlist totalPlacedItemList��  ��  � k     <�� ��� q      �� ������  0 placeditemlist placedItemList��  � ��� l     ��������  ��  ��  � ��� O     ��� Q    ���� r    ��� n    ��� 1    ��
�� 
aiFS� n    ��� 2    ��
�� 
caPL� 4    ���
�� 
docu� o   	 
���� 0 documentfile documentFile� o      ����  0 placeditemlist placedItemList� R      ������
�� .ascrerr ****      � ****��  ��  � r    ��� J    ����  � o      ����  0 placeditemlist placedItemList� m     ��                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  � ��� l   ��������  ��  ��  � ��� X    9����� r   / 4��� b   / 2��� o   / 0���� *0 totalplaceditemlist totalPlacedItemList� o   0 1����  0 placeditempath placedItemPath� o      ���� *0 totalplaceditemlist totalPlacedItemList��  0 placeditempath placedItemPath� o   " #����  0 placeditemlist placedItemList� ��� l  : :��������  ��  ��  � ���� L   : <�� o   : ;���� *0 totalplaceditemlist totalPlacedItemList��  � ��� l     ��������  ��  ��  � ��� l     ��������  ��  ��  � ��� l      ������  �a[*******************************************************************************
	AnalyzeDocumentGradients - Find all Gradients defined in the document.
								Skip Gradients that begin with "Unnamed" because these
								gradients are internal Illustrator gradients
*******************************************************************************   � �  � * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 A n a l y z e D o c u m e n t G r a d i e n t s   -   F i n d   a l l   G r a d i e n t s   d e f i n e d   i n   t h e   d o c u m e n t . 
 	 	 	 	 	 	 	 	 S k i p   G r a d i e n t s   t h a t   b e g i n   w i t h   " U n n a m e d "   b e c a u s e   t h e s e 
 	 	 	 	 	 	 	 	 g r a d i e n t s   a r e   i n t e r n a l   I l l u s t r a t o r   g r a d i e n t s 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *�  i  $ ' I      ������ 40 analyzedocumentgradients AnalyzeDocumentGradients  o      ���� 0 documentfile documentFile �� o      ���� &0 totalgradientlist totalGradientList��  ��   k     S		 

 q       ������ 0 gradientlist gradientList��    q       ������ 0 gradientname gradientName��    l     ��������  ��  ��    O     ( Q    ' r     6    n     1    ��
�� 
pnam n      2    ��
�� 
caGD  4    ��!
�� 
docu! o   	 
���� 0 documentfile documentFile H    "" C    #$# 1    ��
�� 
pnam$ m    %% �&&  U n n a m e d o      ���� 0 gradientlist gradientList R      ������
�� .ascrerr ****      � ****��  ��   r   # ''(' J   # %����  ( o      ���� 0 gradientlist gradientList m     ))                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��   *+* l  ) )��������  ��  ��  + ,-, X   ) N.��/. Z   9 I01����0 l  9 =2����2 H   9 =33 l  9 <4����4 E   9 <565 o   9 :���� &0 totalgradientlist totalGradientList6 o   : ;���� 0 gradientname gradientName��  ��  ��  ��  1 r   @ E787 b   @ C9:9 o   @ A���� &0 totalgradientlist totalGradientList: o   A B���� 0 gradientname gradientName8 o      ���� &0 totalgradientlist totalGradientList��  ��  �� 0 gradientname gradientName/ o   , -���� 0 gradientlist gradientList- ;<; l  O O��������  ��  ��  < =>= L   O Q?? o   O P���� &0 totalgradientlist totalGradientList> @��@ l  R R��������  ��  ��  ��   ABA l     ��������  ��  ��  B CDC l     ��������  ��  ��  D EFE l      ��GH��  GQK*******************************************************************************
	AnalyzeDocumentSpotColors - Find all spot color definitions in the document.
										Ignore the registration spot color because it is
										present in all documents
*******************************************************************************   H �II� * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 A n a l y z e D o c u m e n t S p o t C o l o r s   -   F i n d   a l l   s p o t   c o l o r   d e f i n i t i o n s   i n   t h e   d o c u m e n t . 
 	 	 	 	 	 	 	 	 	 	 I g n o r e   t h e   r e g i s t r a t i o n   s p o t   c o l o r   b e c a u s e   i t   i s 
 	 	 	 	 	 	 	 	 	 	 p r e s e n t   i n   a l l   d o c u m e n t s 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *F JKJ l     ��������  ��  ��  K LML i  ( +NON I      ��P���� 60 analyzedocumentspotcolors AnalyzeDocumentSpotColorsP QRQ o      ���� 0 documentfile documentFileR S��S o      ���� 0 totalspotlist totalSpotList��  ��  O k     STT UVU q      WW ������ 0 spotcolorlist spotColorList��  V XYX l     ��������  ��  ��  Y Z[Z O     (\]\ Q    '^_`^ r    aba 6   cdc n    efe 1    ��
�� 
pnamf n    ghg 2    ��
�� 
caCCh 4    ��i
�� 
docui o   	 
���� 0 documentfile documentFiled H    jj C    klk 1    ��
�� 
pnaml m    mm �nn  [ R e g i s t r a t i o n ]b o      ���� 0 spotcolorlist spotColorList_ R      ��~�}
� .ascrerr ****      � ****�~  �}  ` r   # 'opo J   # %�|�|  p o      �{�{ 0 spotcolorlist spotColorList] m     qq                                                                                  ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  [ rsr l  ) )�z�y�x�z  �y  �x  s tut X   ) Nv�wwv Z   9 Ixy�v�ux l  9 =z�t�sz H   9 ={{ l  9 <|�r�q| E   9 <}~} o   9 :�p�p 0 totalspotlist totalSpotList~ o   : ;�o�o 0 spotname spotName�r  �q  �t  �s  y r   @ E� b   @ C��� o   @ A�n�n 0 totalspotlist totalSpotList� o   A B�m�m 0 spotname spotName� o      �l�l 0 totalspotlist totalSpotList�v  �u  �w 0 spotname spotNamew o   , -�k�k 0 spotcolorlist spotColorListu ��� l  O O�j�i�h�j  �i  �h  � ��� L   O Q�� o   O P�g�g 0 totalspotlist totalSpotList� ��f� l  R R�e�d�c�e  �d  �c  �f  M ��� l     �b�a�`�b  �a  �`  � ��� l     �_�^�]�_  �^  �]  � ��� l      �\���\  � � �*******************************************************************************
	AnalyzeDocumentFonts - Find all fonts used in the document.
*******************************************************************************   � ���� * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 A n a l y z e D o c u m e n t F o n t s   -   F i n d   a l l   f o n t s   u s e d   i n   t h e   d o c u m e n t . 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *� ��� i  , /��� I      �[��Z�[ ,0 analyzedocumentfonts AnalyzeDocumentFonts� ��Y� o      �X�X 0 documentfile documentFile�Y  �Z  � k     d�� ��� q      �� �W��W $0 documentfontlist documentFontList� �V��V 0 fontlist fontList� �U�T�U 0 textitemlist textItemList�T  � ��� O     _��� k    ^�� ��� l   �S�R�Q�S  �R  �Q  � ��� r    
��� 4    �P�
�P 
docu� o    �O�O 0 documentfile documentFile� o      �N�N 0 docref docRef� ��� r    ��� n    ��� 2    �M
�M 
cTXa� o    �L�L 0 docref docRef� o      �K�K 0 textitemlist textItemList� ��� l   �J�I�H�J  �I  �H  � ��� r    ��� J    �G�G  � o      �F�F 0 fontlist fontList� ��� l   �E���E  � S M We want to get every font used by every item in the list so we first iterate   � ��� �   W e   w a n t   t o   g e t   e v e r y   f o n t   u s e d   b y   e v e r y   i t e m   i n   t h e   l i s t   s o   w e   f i r s t   i t e r a t e� ��� l   �D���D  � / ) over every text art in the provided list   � ��� R   o v e r   e v e r y   t e x t   a r t   i n   t h e   p r o v i d e d   l i s t� ��� l   \���� X    \��C�� k   & W�� ��� l  & &�B�A�@�B  �A  �@  � ��� l   & &�?���?  ��� There are different ways that we can get every font used by a particular text art item
		One way is to ask each character for it's font.
		That would look like the following:
		
			set characterCount to count characters in textart
			repeat with i from 1 to characterCount
				set characterFont to text font of character i of textart
				if (not (fontList contains characterFont)) then
					set fontList to fontList & characterFont
				end if
			end repeat

		This approach works fine but it's slow because we send a query to Illustrator for each
		character in the document.
		
		A faster way is to make use of the whose clause. What we'll do is:
		1) Ask for the font of the first character
		2) Then ask for a list of the characters in the text art that uses a different font
		3) For each element in the list of characters that use a different font, we ask each one about what font it uses
		The benefit of this way of doing it is that a text art item that only uses 1 font, will
		result in at the most 2 queries, no matter how long it is:
			- one for the font of the first character
			- one asking for the font of differently formatted characters. This list is empty for text art items that only use 1 font in which case we are done
			with the item
		   � ���	�   T h e r e   a r e   d i f f e r e n t   w a y s   t h a t   w e   c a n   g e t   e v e r y   f o n t   u s e d   b y   a   p a r t i c u l a r   t e x t   a r t   i t e m 
 	 	 O n e   w a y   i s   t o   a s k   e a c h   c h a r a c t e r   f o r   i t ' s   f o n t . 
 	 	 T h a t   w o u l d   l o o k   l i k e   t h e   f o l l o w i n g : 
 	 	 
 	 	 	 s e t   c h a r a c t e r C o u n t   t o   c o u n t   c h a r a c t e r s   i n   t e x t a r t 
 	 	 	 r e p e a t   w i t h   i   f r o m   1   t o   c h a r a c t e r C o u n t 
 	 	 	 	 s e t   c h a r a c t e r F o n t   t o   t e x t   f o n t   o f   c h a r a c t e r   i   o f   t e x t a r t 
 	 	 	 	 i f   ( n o t   ( f o n t L i s t   c o n t a i n s   c h a r a c t e r F o n t ) )   t h e n 
 	 	 	 	 	 s e t   f o n t L i s t   t o   f o n t L i s t   &   c h a r a c t e r F o n t 
 	 	 	 	 e n d   i f 
 	 	 	 e n d   r e p e a t 
 
 	 	 T h i s   a p p r o a c h   w o r k s   f i n e   b u t   i t ' s   s l o w   b e c a u s e   w e   s e n d   a   q u e r y   t o   I l l u s t r a t o r   f o r   e a c h 
 	 	 c h a r a c t e r   i n   t h e   d o c u m e n t . 
 	 	 
 	 	 A   f a s t e r   w a y   i s   t o   m a k e   u s e   o f   t h e   w h o s e   c l a u s e .   W h a t   w e ' l l   d o   i s : 
 	 	 1 )   A s k   f o r   t h e   f o n t   o f   t h e   f i r s t   c h a r a c t e r 
 	 	 2 )   T h e n   a s k   f o r   a   l i s t   o f   t h e   c h a r a c t e r s   i n   t h e   t e x t   a r t   t h a t   u s e s   a   d i f f e r e n t   f o n t 
 	 	 3 )   F o r   e a c h   e l e m e n t   i n   t h e   l i s t   o f   c h a r a c t e r s   t h a t   u s e   a   d i f f e r e n t   f o n t ,   w e   a s k   e a c h   o n e   a b o u t   w h a t   f o n t   i t   u s e s 
 	 	 T h e   b e n e f i t   o f   t h i s   w a y   o f   d o i n g   i t   i s   t h a t   a   t e x t   a r t   i t e m   t h a t   o n l y   u s e s   1   f o n t ,   w i l l 
 	 	 r e s u l t   i n   a t   t h e   m o s t   2   q u e r i e s ,   n o   m a t t e r   h o w   l o n g   i t   i s : 
 	 	 	 -   o n e   f o r   t h e   f o n t   o f   t h e   f i r s t   c h a r a c t e r 
 	 	 	 -   o n e   a s k i n g   f o r   t h e   f o n t   o f   d i f f e r e n t l y   f o r m a t t e d   c h a r a c t e r s .   T h i s   l i s t   i s   e m p t y   f o r   t e x t   a r t   i t e m s   t h a t   o n l y   u s e   1   f o n t   i n   w h i c h   c a s e   w e   a r e   d o n e 
 	 	 	 w i t h   t h e   i t e m 
 	 	� ��� l  & &�>�=�<�>  �=  �<  � ��� l  & U���� Z   & U���;�:� l  & /��9�8� ?   & /��� l  & -��7�6� I  & -�5��4
�5 .corecnte****       ****� n  & )��� 2  ' )�3
�3 
cha � o   & '�2�2 0 textart  �4  �7  �6  � m   - .�1�1  �9  �8  � k   2 Q�� ��� l  2 2�0���0  � * $ Get the font of the first character   � ��� H   G e t   t h e   f o n t   o f   t h e   f i r s t   c h a r a c t e r� ��� r   2 >��� l  2 <��/�.� n   2 <��� 1   : <�-
�- 
pnam� n   2 :��� m   8 :�,
�, 
cTXf� n   2 8��� 4   5 8�+�
�+ 
cha � m   6 7�*�* � n   2 5��� m   3 5�)
�) 
ctxt� o   2 3�(�( 0 textart  �/  �.  � o      �'�' 0 characterfont characterFont� ��� l  ? ?�&���&  � 8 2 Add to list of fonts if it is not already in list   � ��� d   A d d   t o   l i s t   o f   f o n t s   i f   i t   i s   n o t   a l r e a d y   i n   l i s t� ��� Z   ? O���%�$� l  ? C��#�"� H   ? C�� l  ? B��!� � E   ? B� � o   ? @�� 0 fontlist fontList  o   @ A�� 0 characterfont characterFont�!  �   �#  �"  � r   F K b   F I o   F G�� 0 fontlist fontList o   G H�� 0 characterfont characterFont o      �� 0 fontlist fontList�%  �$  �  l  P P����  �  �   � l  P P����  �  �  �  �;  �:  � - ' ((count of characters in textart) > 0)   � � N   ( ( c o u n t   o f   c h a r a c t e r s   i n   t e x t a r t )   >   0 )� 	�	 l  V V����  �  �  �  �C 0 textart  � o    �� 0 textitemlist textItemList� #  with textart in textItemList   � �

 :   w i t h   t e x t a r t   i n   t e x t I t e m L i s t� � l  ] ]����  �  �  �  � m                                                                                       ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  �  l  ` `�
�	��
  �	  �    L   ` b o   ` a�� 0 fontlist fontList � l  c c����  �  �  �  �  l     ��� �  �  �     l     ��������  ��  ��    l      ����   � �*******************************************************************************
	Andy's famous hack guaranteed to always get a list of aliases from the Finder
*******************************************************************************    �� * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 A n d y ' s   f a m o u s   h a c k   g u a r a n t e e d   t o   a l w a y s   g e t   a   l i s t   o f   a l i a s e s   f r o m   t h e   F i n d e r 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  i  0 3 I      �� ���� 00 getaliaslistfromfinder GetAliasListFromFinder  !��! o      ���� (0 containerreference containerReference��  ��   k     &"" #$# q      %% ��&�� 0 	aliaslist 	aliasList& ������ 0 fromitem fromItem��  $ '(' l     ��������  ��  ��  ( )*) Q     !+,-+ O    ./. r    010 c    232 l   4����4 c    565 n    787 2    ��
�� 
file8 4    ��9
�� 
cfol9 o   	 
���� (0 containerreference containerReference6 m    ��
�� 
alis��  ��  3 m    ��
�� 
list1 o      ���� 0 	aliaslist 	aliasList/ m    ::�                                                                                  MACS  alis    r  Macintosh HD               ��+H+     j
Finder.app                                                       �ǰ�        ����  	                CoreServices    ��      ǰ�       j   &   %  3Macintosh HD:System:Library:CoreServices:Finder.app    
 F i n d e r . a p p    M a c i n t o s h   H D  &System/Library/CoreServices/Finder.app  / ��  , R      ����;
�� .ascrerr ****      � ****��  ; ��<��
�� 
erob< o      ���� 0 fromitem fromItem��  - r    !=>= c    ?@? o    ���� 0 fromitem fromItem@ m    ��
�� 
list> o      ���� 0 	aliaslist 	aliasList* ABA l  " "��������  ��  ��  B CDC L   " $EE o   " #���� 0 	aliaslist 	aliasListD F��F l  % %��������  ��  ��  ��   GHG l     ��������  ��  ��  H IJI l      ��KL��  K*******************************************************************************
	Validate the input parameter to an open handler.
	In this case, make sure the input parameter contains a single folder.
*******************************************************************************   L �MM0 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 	 V a l i d a t e   t h e   i n p u t   p a r a m e t e r   t o   a n   o p e n   h a n d l e r . 
 	 I n   t h i s   c a s e ,   m a k e   s u r e   t h e   i n p u t   p a r a m e t e r   c o n t a i n s   a   s i n g l e   f o l d e r . 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *J NON l     ��������  ��  ��  O PQP i  4 7RSR I      ��T���� 60 validatesinglefolderinput ValidateSingleFolderInputT U��U o      ���� 0 theitems  ��  ��  S k     9VV WXW q      YY ��Z�� 0 foldercount folderCountZ ��[�� 0 itemkind itemKind[ ��\�� "0 itemoneisfolder itemOneIsFolder\ ������  0 documentfolder documentFolder��  X ]^] l     ��������  ��  ��  ^ _`_ r     aba I    ��c��
�� .corecnte****       ****c o     ���� 0 theitems  ��  b o      ���� 0 foldercount folderCount` ded l   ��������  ��  ��  e fgf O    hih k    jj klk r    mnm l   o����o n    pqp 1    ��
�� 
kindq n    rsr 4    ��t
�� 
cobjt m    ���� s o    ���� 0 theitems  ��  ��  n o      ���� 0 itemkind itemKindl u��u r    vwv =    xyx o    ���� 0 itemkind itemKindy m    zz �{{  f o l d e rw o      ���� "0 itemoneisfolder itemOneIsFolder��  i m    	||�                                                                                  MACS  alis    r  Macintosh HD               ��+H+     j
Finder.app                                                       �ǰ�        ����  	                CoreServices    ��      ǰ�       j   &   %  3Macintosh HD:System:Library:CoreServices:Finder.app    
 F i n d e r . a p p    M a c i n t o s h   H D  &System/Library/CoreServices/Finder.app  / ��  g }~} l   ��������  ��  ��  ~ � Z    4������ G    &��� >    ��� o    ���� 0 foldercount folderCount� m    ���� � H   " $�� o   " #���� "0 itemoneisfolder itemOneIsFolder� L   ) +����  ��  � r   . 4��� n   . 2��� 4   / 2���
�� 
cobj� m   0 1���� � o   . /���� 0 theitems  � o      ����  0 documentfolder documentFolder� ��� l  5 5��������  ��  ��  � ��� L   5 7�� o   5 6����  0 documentfolder documentFolder� ���� l  8 8��������  ��  ��  ��  Q ��� l     ��������  ��  ��  � ���� l     ��������  ��  ��  ��       �������������������  � ����������������������������
�� .aevtoappnull  �   � ****
�� .aevtodocnull  �    alis�� 0 analyzefolder AnalyzeFolder�� 00 generatedocumentreport GenerateDocumentReport�� (0 generatefontreport GenerateFontReport�� 00 generategradientreport GenerateGradientReport�� 20 generatespotcolorreport GenerateSpotColorReport�� 40 generateplaceditemreport GeneratePlacedItemReport�� 80 analyzedocumentplaceditems AnalyzeDocumentPlacedItems�� 40 analyzedocumentgradients AnalyzeDocumentGradients�� 60 analyzedocumentspotcolors AnalyzeDocumentSpotColors�� ,0 analyzedocumentfonts AnalyzeDocumentFonts�� 00 getaliaslistfromfinder GetAliasListFromFinder�� 60 validatesinglefolderinput ValidateSingleFolderInput� �� ��������
�� .aevtoappnull  �   � ****��  ��  �  � ������
�� .sysostflalis    ��� null��  0 documentfolder documentFolder�� 0 analyzefolder AnalyzeFolder�� *j  E�O*�k+ � �� '��������
�� .aevtodocnull  �    alis�� 0 theitems  ��  � ����� 0 theitems  �  0 documentfolder documentFolder� �~�}�~ 60 validatesinglefolderinput ValidateSingleFolderInput�} 0 analyzefolder AnalyzeFolder�� *�k+  E�O*�k+ � �| B�{�z���y�| 0 analyzefolder AnalyzeFolder�{ �x��x �  �w�w  0 documentfolder documentFolder�z  � �v�u�t�s�r�q�p�o�n�m�l�k�j�i�h�v  0 documentfolder documentFolder�u $0 documentfontlist documentFontList�t ,0 documentgradientlist documentGradientList�s .0 documentspotcolorlist documentSpotColorList�r 00 documentplaceditemlist documentPlacedItemList�q 0 
mydoccount 
myDocCount�p 0 documentfilelist  �o 0 documentcount documentCount�n 0 reportername reporterName�m  0 reporterdocref reporterDocRef�l  0 documentheight documentHeight�k 0 topedge topEdge�j 0 i  �i 0 documentfile documentFile�h  0 mydocumentname myDocumentName� $ s�g�f�e�d ��c ��b�a�`�_�^ ��]�\�[�Z�Y�X�W�V�U�T�S�R�Q�P�O�N�M�L�K�J�I�H
�g 
docu
�f .corecnte****       ****
�e .miscactvnull��� ��� null
�d .sysobeepnull��� ��� long
�c 
btns
�b 
dflt
�a 
disp�` 
�_ .sysodlogaskr        TEXT�^ 00 getaliaslistfromfinder GetAliasListFromFinder
�] 
kocl
�\ 
prdt
�[ 
caCS
�Z eCLSeRbM�Y 
�X .corecrel****      � null
�W 
kfil
�V 
file
�U .coresavedocu       docu
�T 
pSHh�S 2
�R 
cobj
�Q .aevtodocnull  �    alis
�P 
aiAD
�O 
pnam�N ,0 analyzedocumentfonts AnalyzeDocumentFonts�M 40 analyzedocumentgradients AnalyzeDocumentGradients�L 60 analyzedocumentspotcolors AnalyzeDocumentSpotColors�K 80 analyzedocumentplaceditems AnalyzeDocumentPlacedItems
�J 
savo
�I .coreclosnull���    docu�H 00 generatedocumentreport GenerateDocumentReport�yjvE�OjvE�OjvE�OjvE�O� *�-j E�UO�j !)j O*j O���kv�k�j� OhY hO� *j UO*�k+ E�O�j E�O�E�O� -*���a a la  E�O�a *a �/l O�a ,E�UO�a E�O kk�kh �a �/E�O� �j O*a ,a ,E�UO�*�k+ %E�O*��l+ E�O*��l+ E�O*��l+  E�O� *a ,a !fl "UOP[OY��O*�������+ #OP� �GS�F�E���D�G 00 generatedocumentreport GenerateDocumentReport�F �C��C �  �B�A�@�?�>�=�B "0 docreportername docReporterName�A 0 topedge topEdge�@ 0 docfontlist docFontList�? "0 docgradientlist docGradientList�> &0 docplaceditemlist docPlacedItemList�= $0 docspotcolorlist docSpotColorList�E  � �<�;�:�9�8�7�6�5�4�3�2�< "0 docreportername docReporterName�; 0 topedge topEdge�: 0 docfontlist docFontList�9 "0 docgradientlist docGradientList�8 &0 docplaceditemlist docPlacedItemList�7 $0 docspotcolorlist docSpotColorList�6 0 leftedge leftEdge�5 0 lineleading lineLeading�4 0 textgap textGap�3 0 docref docRef�2 *0 documentheadingline documentHeadingLine� �1�0��/�.�-�,�+��*�)�(�'��&�%�$�#�"�!�1�0 
�/ 
docu
�. 
kocl
�- 
cTXa
�, 
prdt
�+ 
pCNT
�* 
paPs�) 2�( 
�' .corecrel****      � null
�& 
ctxt
�% 
ptsz�$ (0 generatefontreport GenerateFontReport�# 00 generategradientreport GenerateGradientReport�" 20 generatespotcolorreport GenerateSpotColorReport�! 40 generateplaceditemreport GeneratePlacedItemReport�D m�E�O�E�O�E�O� &*�/E�O*��,�����lv�� E�O���-�,FUO��l E�O*���m+ E�O*���m+ E�O*���m+ E�O*���m+ E�O�� � �������  (0 generatefontreport GenerateFontReport� ��� �  ���� "0 docreportername docReporterName� 0 fontlist fontList� 0 topedge topEdge�  � ������������� "0 docreportername docReporterName� 0 fontlist fontList� 0 topedge topEdge� 0 lineleading lineLeading� 0 textgap textGap� 0 docref docRef� 0 documentwidth documentWidth� 0 leftedge leftEdge� 0 	fontcount 	fontCount� "0 fontheadingline fontHeadingLine� 0 fontname fontName� 0 fontnameline fontNameLine� ����
�	�����#%�*��� ��5������������� 
� 
docu
�
 
pSHw�	 

� .corecnte****       ****
� 
kocl
� 
cTXa
� 
prdt
� 
pCNT
� 
ctxt
� 
paPs� K�  
�� .corecrel****      � null
�� 
ptsz
�� 
cobj
�� eTBae123
�� 
cpar
�� 
pT16
�� 
cTXf� ��E�O�E�O� �*�/E�O��,E�O�l!�E�O�j E�O*��,����%��&%�%��lva a  E�Oa ��-a ,FO��E�O q�[�a l kh 
*��,��lva a  E�Oa �a k/a ,FO*��,���l!��lva a  E�O*a �/��-a ,FO��E�[OY��O��E�OPUO�OP� ������������� 00 generategradientreport GenerateGradientReport�� ����� �  �������� "0 docreportername docReporterName�� 0 gradientlist gradientList�� 0 topedge topEdge��  � �������������������������� "0 docreportername docReporterName�� 0 gradientlist gradientList�� 0 topedge topEdge�� 0 lineleading lineLeading�� 0 textgap textGap�� 0 docref docRef�� 0 documentwidth documentWidth�� 0 leftedge leftEdge�� 0 gradientcount gradientCount�� "0 gradientheading gradientHeading�� 0 gradientname gradientName�� $0 gradientnameline gradientNameLine� ��X���������������������������������������� 
�� 
docu
�� 
pSHw�� 

�� .corecnte****       ****
�� 
kocl
�� 
cTXa
�� 
prdt
�� 
pCNT
�� 
ctxt
�� 
paPs�� K�� 
�� .corecrel****      � null
�� 
ptsz
�� 
cobj
�� eTBae123
�� 
cpar
�� 
pT16�� ��E�O�E�O� �*�/E�O��,E�O�l!�E�O�j E�O*��,����%��&%�%��lva a  E�Oa ��-a ,FO��E�O D�[�a l kh 
*��,��lva a  E�Oa �a k/a ,FO��E�[OY��O��E�UO�� ��g���������� 20 generatespotcolorreport GenerateSpotColorReport�� ����� �  �������� "0 docreportername docReporterName�� 0 thelist theList�� 0 topedge topEdge��  � �������������������������� "0 docreportername docReporterName�� 0 thelist theList�� 0 topedge topEdge�� 0 lineleading lineLeading�� 0 textgap textGap�� 0 docref docRef�� 0 documentwidth documentWidth�� 0 leftedge leftEdge�� 0 	listcount 	listCount�� 0 spotheading spotHeading�� 0 spotname spotName�� 0 nameline nameLine� ��
������������������������������������������ 
�� 
docu
�� 
pSHw�� 

�� .corecnte****       ****
�� 
kocl
�� 
cTXa
�� 
prdt
�� 
pCNT
�� 
ctxt
�� 
paPs�� K�� 
�� .corecrel****      � null
�� 
ptsz
�� 
cobj
�� eTBae123
�� 
cpar
�� 
pT16�� ��E�O�E�O� �*�/E�O��,E�O�l!�E�O�j E�O*��,����%��&%�%��lva a  E�Oa ��-a ,FO��E�O D�[�a l kh 
*��,��lva a  E�Oa �a k/a ,FO��E�[OY��O��E�UO�OP� ������������ 40 generateplaceditemreport GeneratePlacedItemReport�� ����� �  �������� "0 docreportername docReporterName��  0 placeditemlist placedItemList�� 0 topedge topEdge��  � �������������������������� "0 docreportername docReporterName��  0 placeditemlist placedItemList�� 0 topedge topEdge�� 0 leftedge leftEdge�� 0 lineleading lineLeading�� 0 textgap textGap�� 0 docref docRef�� "0 placeditemcount placedItemCount�� &0 placeditemheading placedItemHeading�� 0 placeditemref placedItemRef��  0 placeditempath placedItemPath�� (0 placeditemnameline placedItemNameLine� �����������������UW��\��������g��������������� d�� 
�� 
docu
�� .corecnte****       ****
�� 
kocl
�� 
cTXa
�� 
prdt
�� 
pCNT
�� 
ctxt
�� 
paPs�� K�� 
�� .corecrel****      � null
�� 
ptsz
�� 
cobj
�� 
TEXT
�� eTBae121
�� 
cpar
�� 
pT16�� ��E�O�E�O�E�O� �*�/E�O�j E�O*��,����%��&%�%��lv�� E�Oa ��-a ,FO��E�O T�[�a l kh 	�a &E�O�a  /*��,�����lv�� E�Oa �a k/a ,FO��E�Y h[OY��O��E�UO�OP� ������������� 80 analyzedocumentplaceditems AnalyzeDocumentPlacedItems�� ��� �  �~�}�~ 0 documentfile documentFile�} *0 totalplaceditemlist totalPlacedItemList��  � �|�{�z�y�| 0 documentfile documentFile�{ *0 totalplaceditemlist totalPlacedItemList�z  0 placeditemlist placedItemList�y  0 placeditempath placedItemPath� 	��x�w�v�u�t�s�r�q
�x 
docu
�w 
caPL
�v 
aiFS�u  �t  
�s 
kocl
�r 
cobj
�q .corecnte****       ****�� =�  *�/�-�,E�W X  jvE�UO �[��l kh ��%E�[OY��O�� �p�o�n���m�p 40 analyzedocumentgradients AnalyzeDocumentGradients�o �l��l �  �k�j�k 0 documentfile documentFile�j &0 totalgradientlist totalGradientList�n  � �i�h�g�f�i 0 documentfile documentFile�h &0 totalgradientlist totalGradientList�g 0 gradientlist gradientList�f 0 gradientname gradientName� )�e�d�c�%�b�a�`�_�^
�e 
docu
�d 
caGD
�c 
pnam�  �b  �a  
�` 
kocl
�_ 
cobj
�^ .corecnte****       ****�m T� % *�/�-�,�[�,\Z�>C1E�W X  jvE�UO $�[��l 
kh �� 
��%E�Y h[OY��O�OP� �]O�\�[���Z�] 60 analyzedocumentspotcolors AnalyzeDocumentSpotColors�\ �Y��Y �  �X�W�X 0 documentfile documentFile�W 0 totalspotlist totalSpotList�[  � �V�U�T�S�V 0 documentfile documentFile�U 0 totalspotlist totalSpotList�T 0 spotcolorlist spotColorList�S 0 spotname spotName� q�R�Q�P�m�O�N�M�L�K
�R 
docu
�Q 
caCC
�P 
pnam�O  �N  
�M 
kocl
�L 
cobj
�K .corecnte****       ****�Z T� % *�/�-�,�[�,\Z�>C1E�W X  jvE�UO $�[��l 
kh �� 
��%E�Y h[OY��O�OP� �J��I�H���G�J ,0 analyzedocumentfonts AnalyzeDocumentFonts�I �F��F �  �E�E 0 documentfile documentFile�H  � �D�C�B�A�@�?�>�D 0 documentfile documentFile�C $0 documentfontlist documentFontList�B 0 fontlist fontList�A 0 textitemlist textItemList�@ 0 docref docRef�? 0 textart  �> 0 characterfont characterFont� 
�=�<�;�:�9�8�7�6�5
�= 
docu
�< 
cTXa
�; 
kocl
�: 
cobj
�9 .corecnte****       ****
�8 
cha 
�7 
ctxt
�6 
cTXf
�5 
pnam�G e� \*�/E�O��-E�OjvE�O E�[��l kh ��-j j $��-�k/�,�,E�O�� 
��%E�Y hOPY hOP[OY��OPUO�OP� �4�3�2���1�4 00 getaliaslistfromfinder GetAliasListFromFinder�3 �0��0 �  �/�/ (0 containerreference containerReference�2  � �.�-�,�. (0 containerreference containerReference�- 0 	aliaslist 	aliasList�, 0 fromitem fromItem� :�+�*�)�(�'�
�+ 
cfol
�* 
file
�) 
alis
�( 
list�'  � �&�%�$
�& 
erob�% 0 fromitem fromItem�$  �1 ' � *�/�-�&�&E�UW X  ��&E�O�OP� �#S�"�!��� �# 60 validatesinglefolderinput ValidateSingleFolderInput�" ��� �  �� 0 theitems  �!  � ������ 0 theitems  � 0 foldercount folderCount� 0 itemkind itemKind� "0 itemoneisfolder itemOneIsFolder�  0 documentfolder documentFolder� �|��z�
� .corecnte****       ****
� 
cobj
� 
kind
� 
bool�  :�j  E�O� ��k/�,E�O�� E�UO�k
 ��& hY ��k/E�O�OP ascr  ��ޭ