FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2005-2010 Adobe Systems Incorporated 
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
 C o p y r i g h t   2 0 0 5 - 2 0 1 0   A d o b e   S y s t e m s   I n c o r p o r a t e d   
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
 l     ��������  ��  ��        l     ��������  ��  ��        l     ��  ��    0 *	Enter and select some text in a document.     �   T 	 E n t e r   a n d   s e l e c t   s o m e   t e x t   i n   a   d o c u m e n t .      l     ��  ��    7 1   Try this script by selecting both the bounding     �   b       T r y   t h i s   s c r i p t   b y   s e l e c t i n g   b o t h   t h e   b o u n d i n g      l     ��  ��    @ :   box around the text or the text inside the bounding box     �   t       b o x   a r o u n d   t h e   t e x t   o r   t h e   t e x t   i n s i d e   t h e   b o u n d i n g   b o x      l     ��������  ��  ��     ��  l    �  ����   O     � ! " ! k    � # #  $ % $ l   ��������  ��  ��   %  &�� & Z    � ' (�� ) ' l    *���� * =     + , + l    -���� - I   �� .��
�� .corecnte****       **** . 2   ��
�� 
docu��  ��  ��   , m    ����  ��  ��   ( k     / /  0 1 0 I   ������
�� .miscactvnull��� ��� null��  ��   1  2�� 2 I   �� 3��
�� .sysodisAaleR        TEXT 3 m     4 4 � 5 5 | T h e r e   m u s t   b e   a t   l e a s t   o n e   o p e n   d o c u m e n t   w i t h   a   t e x t   s e l e c t i o n��  ��  ��   ) k    � 6 6  7 8 7 l   �� 9 :��   9 + %	Get a reference to the selected text    : � ; ; J 	 G e t   a   r e f e r e n c e   t o   t h e   s e l e c t e d   t e x t 8  < = < r    % > ? > n    # @ A @ 1   ! #��
�� 
sele A 1    !��
�� 
aiAD ? o      ���� "0 selectionobject selectionObject =  B�� B Z   & � C D�� E C l  & + F���� F =   & + G H G n   & ) I J I 1   ' )��
�� 
leng J o   & '���� "0 selectionobject selectionObject H m   ) *����  ��  ��   D k   . 9 K K  L M L I  . 3������
�� .miscactvnull��� ��� null��  ��   M  N�� N I  4 9�� O��
�� .sysodisAaleR        TEXT O m   4 5 P P � Q Q h T h e r e   m u s t   b e   a t   l e a s t   o n e   s e l e c t i o n   i n   t h e   d o c u m e n t��  ��  ��   E k   < � R R  S T S l  < <�� U V��   U P J	You can validate the selection as a test selection in the following ways:    V � W W � 	 Y o u   c a n   v a l i d a t e   t h e   s e l e c t i o n   a s   a   t e s t   s e l e c t i o n   i n   t h e   f o l l o w i n g   w a y s : T  X Y X r   < A Z [ Z n   < ? \ ] \ 1   = ?��
�� 
pcls ] o   < =���� "0 selectionobject selectionObject [ o      ����  0 selectionclass selectionClass Y  ^�� ^ Z   B � _ ` a b _ G   B k c d c G   B a e f e G   B W g h g G   B M i j i =  B E k l k o   B C����  0 selectionclass selectionClass l m   C D��
�� 
ctxt j =  H K m n m l 	 H I o���� o o   H I����  0 selectionclass selectionClass��  ��   n m   I J��
�� 
cwor h =  P U p q p l 	 P Q r���� r o   P Q����  0 selectionclass selectionClass��  ��   q m   Q T��
�� 
clin f =  Z _ s t s l 	 Z [ u���� u o   Z [����  0 selectionclass selectionClass��  ��   t m   [ ^��
�� 
cpar d =  d i v w v l 	 d e x���� x o   d e����  0 selectionclass selectionClass��  ��   w m   e h��
�� 
cha  ` k   n � y y  z { z l  n n�� | }��   |  	its a text selection    } � ~ ~ * 	 i t s   a   t e x t   s e l e c t i o n {   �  r   n w � � � n   n s � � � 1   o s��
�� 
pCNT � o   n o���� "0 selectionobject selectionObject � o      ���� 0 selectedtext selectedText �  � � � I  x ��� ���
�� .sysodisAaleR        TEXT � b   x � � � � b   x  � � � m   x { � � � � � B T h e   f o l l o w i n g   t e x t   i s   s e l e c t e d :   > � o   { ~���� 0 selectedtext selectedText � m    � � � � � �  <��   �  ��� � l  � ���������  ��  ��  ��   a  � � � =  � � � � � o   � �����  0 selectionclass selectionClass � m   � ���
�� 
list �  ��� � k   � � � �  � � � l  � ���������  ��  ��   �  � � � Z   � � � ��� � � =  � � � � � l  � � ����� � n   � � � � � 1   � ���
�� 
pcls � n   � � � � � 4   � ��� �
�� 
cobj � m   � �����  � o   � ����� "0 selectionobject selectionObject��  ��   � m   � ���
�� 
cTXa � k   � � � �  � � � l  � ��� � ���   �  	Get the selected text    � � � � , 	 G e t   t h e   s e l e c t e d   t e x t �  � � � r   � � � � � n   � � � � � 1   � ���
�� 
pCNT � n   � � � � � m   � ���
�� 
ctxt � n   � � � � � 4   � ��� �
�� 
cobj � m   � �����  � o   � ����� "0 selectionobject selectionObject � o      ���� 0 selectedtext selectedText �  ��� � I  � ��� ���
�� .sysodisAaleR        TEXT � b   � � � � � b   � � � � � m   � � � � � � � B T h e   f o l l o w i n g   t e x t   i s   s e l e c t e d :   > � o   � ����� 0 selectedtext selectedText � m   � � � � � � �  <��  ��  ��   � k   � � � �  � � � I  � �������
�� .miscactvnull��� ��� null��  ��   �  ��� � I  � ��� ���
�� .sysodisAaleR        TEXT � m   � � � � � � � 4 T e x t u a l   s e l e c t i o n   e x p e c t e d��  ��   �  ��� � l  � ���������  ��  ��  ��  ��   b k   � � � �  � � � I  � �������
�� .miscactvnull��� ��� null��  ��   �  ��� � I  � ��� ���
�� .sysodisAaleR        TEXT � m   � � � � � � � 2 Y o u   m u s t   s e l e c t   s o m e   t e x t��  ��  ��  ��  ��   " m      � �                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��  ��       � � ��   � �~
�~ .aevtoappnull  �   � **** � �} ��|�{ � ��z
�} .aevtoappnull  �   � **** � k     � � �  �y�y  �|  �{   �   �  ��x�w�v 4�u�t�s�r�q P�p�o�n�m�l�k�j�i�h�g � ��f�e�d � � � �
�x 
docu
�w .corecnte****       ****
�v .miscactvnull��� ��� null
�u .sysodisAaleR        TEXT
�t 
aiAD
�s 
sele�r "0 selectionobject selectionObject
�q 
leng
�p 
pcls�o  0 selectionclass selectionClass
�n 
ctxt
�m 
cwor
�l 
bool
�k 
clin
�j 
cpar
�i 
cha 
�h 
pCNT�g 0 selectedtext selectedText
�f 
list
�e 
cobj
�d 
cTXa�z �� �*�-j j  *j O�j Y �*�,�,E�O��,j  *j O�j Y ���,E�O�� 
 �� �&
 	�a  �&
 	�a  �&
 	�a  �&  �a ,E` Oa _ %a %j OPY [�a   F�a k/�,a   %�a k/�-a ,E` Oa _ %a %j Y *j Oa j OPY *j Oa j U ascr  ��ޭ